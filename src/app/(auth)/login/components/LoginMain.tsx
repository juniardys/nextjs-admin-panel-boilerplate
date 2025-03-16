'use client';

import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderButton } from '@/components/button/LoaderButton';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';

const formSchema = z.object({
  email: z.string().min(1, { message: "This field is required" }).email("This is not a valid email address"),
  password: z.string(),
  remember: z.boolean(),
})

const LoginMain: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore();

  const [isLoading, setIsLoading] = useState(false);

  // Check if logged in
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setUser({
        id: '123456789',
        name: 'Juniardy Setiowidayoga',
        email: values.email,
        role: 'Admin',
      });
    } catch (err: any) {
      console.log("error login", err);
      toast.error(`Failed to login: ${err?.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
      <div className='w-4/5 max-w-md md:w-full rounded-xl p-4 shadow-lg bg-white'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full p-8 gap-8 flex flex-col items-center'>
            <h2 className='text-2xl font-bold'>Welcome</h2>
            <div className='w-full flex flex-col gap-4'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder="Enter password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember Me
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='w-full'>
              <LoaderButton
                type="submit"
                className="w-full"
                isLoading={isLoading}
              >
                Login
              </LoaderButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginMain;