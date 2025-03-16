"use client";

import { useState, useEffect, PropsWithChildren } from "react";
import SidebarPanel from "../components/SidebarPanel";
import Navbar from "../components/Navbar";

interface PanelLayoutProps {
  pageTitle?: string;
  onSidebarShown?: (show: boolean) => void;
}

const PanelLayout: React.FC<PropsWithChildren<PanelLayoutProps>> = ({
  pageTitle,
  onSidebarShown = () => { },
  children,
}) => {
  const [showSidebarMenu, setShowSidebarMenu] = useState(true);

  useEffect(() => {
    const handleResize = (e?: any) => {
      if (typeof window !== "undefined" && e?.isTrusted) {
        setShowSidebarMenu(window.innerWidth >= 768);
      }
    };

    handleResize({ isTrusted: true });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    onSidebarShown(showSidebarMenu);
    window.dispatchEvent(new Event('resize'));
  }, [showSidebarMenu])

  return (
    <div className="w-full flex">
      <SidebarPanel isShowed={showSidebarMenu} onShow={setShowSidebarMenu} />
      <main className="bg-gray-100 w-full flex flex-col min-h-screen relative h-fit">
        <Navbar
          pageTitle={pageTitle}
          isSidebarShowed={showSidebarMenu}
          setSidebarShow={setShowSidebarMenu}
        />
        {children}
      </main>
    </div>
  );
};

export default PanelLayout;
