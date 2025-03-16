import { Button } from "@/components/ui/button";
import PanelLayout from "../../layout/PanelLayout"
import { Pencil, PlusCircle, Trash } from "@phosphor-icons/react/dist/ssr";
import { Table } from "antd";
import Swal from 'sweetalert2'
import { useState } from "react";
import { resolvedTailwindConfig } from "@/lib/theme";
import toast from "react-hot-toast";
import FormUserModal, { UserData } from "./modal/FormUserModal";
import { capitalizeWords } from "@/utils/string";
import Pagination from "../../components/Pagination";

const dataSource = [
  {
    key: '1',
    name: 'Juniardy Setiowidayoga',
    email: 'juuns99@gmail.com',
    role: 'admin',
  },
  {
    key: '2',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    role: 'admin',
  },
  {
    key: '3',
    name: 'Jackson Doe',
    email: 'jackson@gmail.com',
    role: 'user',
  },
];

const UserMain: React.FC = () => {
  const [formUserModalOpen, setFormUserModalOpen] = useState(false);
  const [formEditData, setFormEditData] = useState<UserData>();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (value: string) => {
        return capitalizeWords(value);
      }
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setFormEditData({
                id: record?.key,
                name: record?.name,
                email: record?.email,
                role: record?.role,
              });
              setFormUserModalOpen(true);
            }}
          >
            <Pencil />
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              Swal.fire({
                title: 'Are you sure want to remove this user?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: resolvedTailwindConfig.theme?.colors.flatprimary[600],
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, remove it!',
                cancelButtonText: 'No, cancel',
              }).then((result: any) => {
                if (result.isConfirmed) {
                  // TO DO: Call API remove user
                  toast.success('User removed successfully!')
                }
              })
            }}
          >
            <Trash />
          </Button>
        </div>
      ),
    }
  ];

  return (
    <PanelLayout
      pageTitle="User Management"
    >
      <div className="flex flex-col gap-8 p-8">
        <div className="flex flex-col gap-4 p-6 bg-white shadow-original rounded-2xl">
          <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold'>Users</h2>
            <Button
              className="flex items-center gap-2 rounded-3xl"
              onClick={() => setFormUserModalOpen(true)}
            >
              <PlusCircle weight='fill' />
              <p>Add New User</p>
            </Button>
          </div>
          <Table
            bordered={true}
            dataSource={dataSource}
            columns={columns as any}
            pagination={false}
            onChange={() => { }}
            scroll={{ x: 'max-content' }}
          />
          <Pagination
            total={150}
          />
          <FormUserModal
            isEdit={formEditData !== undefined}
            isOpen={formUserModalOpen}
            editData={formEditData}
            onClose={() => {
              setFormUserModalOpen(false);
              setFormEditData(undefined);
            }}
            onSuccess={() => {
              // TODO: Trigger reload user list
            }}
          />
        </div>
      </div>
    </PanelLayout>
  )
}

export default UserMain;