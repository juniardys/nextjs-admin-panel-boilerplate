import { cn } from "@/lib/utils";
import { CaretLineLeft, CaretLineRight } from "@phosphor-icons/react/dist/ssr";
import { Divider } from "antd";
import { useContext, createContext, useState, PropsWithChildren, ReactElement, useEffect } from "react"

interface SidebarProps {
  isShowed?: boolean;
  onShow?: (isShowed: boolean) => void;
}

interface SidebarItemProps {
  icon?: ReactElement | string,
  text?: ReactElement | string,
  active?: boolean,
  alert?: boolean,
}

interface SidebarTitleProps {
  text?: string;
}

interface ISidebarContext {
  expanded: boolean
}

const SidebarContext = createContext<ISidebarContext>({
  expanded: false,
})

export const Sidebar: React.FC<PropsWithChildren<SidebarProps>> = ({ children, onShow, isShowed = true }) => {
  const [expanded, setExpanded] = useState<boolean>(isShowed);

  useEffect(() => {
    if (onShow) {
      onShow(expanded);
    }
  }, [expanded])

  useEffect(() => {
    setExpanded(isShowed || false);
  }, [isShowed])

  return (
    <>
      <aside className={cn(
        "flex h-screen transition-all overflow-hidden md:overflow-visible md:w-fit absolute md:relative z-20",
        expanded ? 'w-fit' : 'w-0'
      )}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-6 flex justify-between items-center">
            <div className={`flex overflow-hidden transition-all text-nowrap w-52 ${expanded ? "md:w-52" : "md:w-0"}`}>
              <h2 className="text-2xl font-bold">Admin Panel</h2>
            </div>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <CaretLineLeft /> : <CaretLineRight />}
            </button>
          </div>
          <hr />
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 py-2">{children}</ul>
          </SidebarContext.Provider>
        </nav>
      </aside>
    </>
  )
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  alert = false
}) => {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
          ? "bg-gradient-to-r from-flatprimary to-flatprimary-700 text-white"
          : "hover:bg-zinc-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span
        className={`flex overflow-hidden transition-all w-52 ml-3 text-nowrap ${expanded ? "md:w-52" : "md:w-0 md:ml-0"}`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-black text-white text-nowrap text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

export const SidebarTitle: React.FC<SidebarTitleProps> = ({
  text,
}) => {
  const { expanded } = useContext(SidebarContext)
  return (
    <li
      className={cn(
        "relative flex items-center px-3 text-sm font-medium rounded-md text-gray-400",
        expanded ? "pt-2" : "h-4"
      )}
    >
      {!expanded && (<Divider className="!m-0" />)}
      <span
        className={`flex overflow-hidden transition-all w-52 text-md text-nowrap ${expanded ? "md:w-52" : "md:w-0 md:ml-0"
          }`}
      >
        {text}
      </span>
    </li>
  )
}
