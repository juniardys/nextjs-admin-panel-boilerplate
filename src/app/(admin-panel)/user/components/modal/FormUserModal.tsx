'use client';

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { FormField, FormLabel, FormControl, FormMessage, Form, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select } from 'antd';
import { LoaderButton } from '@/components/button/LoaderButton';
import toast from 'react-hot-toast';
import { capitalizeWords } from '@/utils/string';

export interface UserData {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  role?: string | null;
}

interface FormUserModalProps {
  isEdit?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  editData?: Partial<UserData>;
}

const roles = [
  'admin',
  'user',
]

const formSchema = z.object({
  id: z.string().nullable().optional().or(z.literal("").transform(() => undefined)),
  name: z.string().nonempty({ message: "Title is required" }),
  email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email address"),
  role: z.custom<string>((val) => roles.includes(val), { message: "Invalid role input" }),
}).required();

const FormUserModal: React.FC<FormUserModalProps> = ({
  isEdit = false,
  isOpen = false,
  onClose = () => { },
  onSuccess = () => { },
  editData,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: null,
      name: '',
      email: '',
      role: '',
    },
    values: {
      ...(editData as any),
    }
  });

  const roleOptions = useMemo(() => {
    return roles.map((value) => ({
      value,
      label: capitalizeWords(value),
    }))
  }, []);

  const handleClose = () => {
    onClose();
    form.reset();
  }

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';

    // Handle Outside Click
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        // Check if the clicked element is not part of the Select dropdown
        if (!(event.target instanceof HTMLElement && event.target.closest('.ant-select-dropdown'))) {
          handleClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      form.reset();
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (!values.id) {
        // TODO: Call API Create User
      } else {
        // TODO: Call API Update User
      }

      if (onSuccess) onSuccess();
      handleClose();
      toast.success(`Success ${!values.id ? 'create' : 'update'} user!`);
    } catch (err: any) {
      console.log(`error ${!values.id ? 'create' : 'update'} user`, err);
      toast.error(`Failed to ${!values.id ? 'create' : 'update'} user: ${err?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 bg-zinc-900/60 w-screen",
        "transition-opacity ease-in-out duration-300",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* card modal */}
        <div className="flex flex-col bg-white rounded-xl p-5 gap-6 w-full max-w-lg" ref={modalRef}>
          {/* content */}
          <div className="flex flex-1">
            <Form {...form}>
              <form onSubmit={(e) => {
                form.handleSubmit(handleSubmit)(e);
              }} className="flex flex-col gap-4 w-full">
                {/* title */}
                <div className="flex items-center justify-between w-full">
                  <p className='text-lg font-bold'>{isEdit ? 'Edit' : 'Add New'} User</p>
                  <X size={20} weight="bold" onClick={() => handleClose()} className='cursor-pointer' />
                </div>

                {/* content */}
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user name..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter user email..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            onChange={(value) => field.onChange(value)} // Ensure proper value change
                            className="w-full"
                            placeholder="Select Role"
                            size='large'
                          >
                            {roleOptions.map((option) => (
                              <Select.Option key={option.value} value={option.value}>
                                {option.label}
                              </Select.Option>
                            ))}
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Footer inside form */}
                <div className="flex justify-end items-center gap-2 py-1">
                  <LoaderButton
                    type="submit"
                    className="rounded-2xl"
                    isLoading={isLoading}
                  >
                    Submit
                  </LoaderButton>
                  <Button
                    type="button"
                    variant="secondary"
                    className="rounded-2xl"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div >
  )
}

export default FormUserModal;
