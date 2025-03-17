import CustomAvatar from "@/components/CustomAvatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/user.store";
import { CaretLineRight } from "@phosphor-icons/react/dist/ssr";
import { Breadcrumb } from "antd";

interface NavbarProps {
  withSidebarButton?: boolean;
  pageTitle?: string;
  isSidebarShowed?: boolean;
  setSidebarShow?: (show: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ withSidebarButton = true, pageTitle, isSidebarShowed, setSidebarShow }) => {
  const { user, logout } = useUserStore();

  const handleSidebarButtonClick = () => {
    if (setSidebarShow) setSidebarShow(true);
  }

  return (
    <div className="w-full flex justify-between items-center bg-white p-3 md:px-6">
      <div className="flex gap-3 items-center">
        {withSidebarButton && (
          <button
            onClick={handleSidebarButtonClick}
            className={cn(
              "p-1.5 h-fit rounded-lg bg-gray-50 hover:bg-gray-100 md:hidden",
              isSidebarShowed ? 'hidden' : 'block'
            )}
          >
            <CaretLineRight />
          </button>
        )}
        <div className="flex flex-col">
          <Breadcrumb
            items={[
              { title: 'Home' },
              { title: pageTitle },
            ]}
          />
          <h2 className="text-lg font-bold">{pageTitle}</h2>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus-visible:outline-none">
            <div className="flex gap-4 items-center">
              <div className="hidden md:flex md:flex-col items-end">
                <p className="text-md font-bold">{user?.name}</p>
                <p className="text-sm">{user?.role}</p>
              </div>
              {
                <CustomAvatar
                  name={"asdvi...71rod"}
                  round
                  size="40"
                  maxInitials={1}
                />
              }
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem className="cursor-pointer" onClick={() => { }}>Settings</DropdownMenuItem> */}
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Navbar;
