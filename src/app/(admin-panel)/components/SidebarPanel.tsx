"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, User } from "@phosphor-icons/react/dist/ssr";
import { Sidebar, SidebarItem, SidebarTitle } from "./Sidebar";

interface SidebarPanel {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

const SidebarPanel: React.FC<SidebarPanel> = ({ isShowed, onShow }) => {
  const pathname = usePathname();

  return (
    <Sidebar isShowed={isShowed} onShow={onShow}>
      <Link href="/dashboard" passHref>
        <SidebarItem
          text="Dashboard"
          icon={<House />}
          active={/^\/dashboard(\/.*)?$/.test(pathname)}
        />
      </Link>

      <SidebarTitle text="Master Data" />
      <Link href="/user" passHref>
        <SidebarItem
          text="User Management"
          icon={<User />}
          active={/^\/user(\/.*)?$/.test(pathname)}
        />
      </Link>
    </Sidebar>
  );
};

export default SidebarPanel;
