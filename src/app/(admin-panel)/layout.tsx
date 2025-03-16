import AdminPanelWrapper from "./components/AdminPanelWrapper";

export default function AdminPanelWrapperLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AdminPanelWrapper>
      {children}
    </AdminPanelWrapper>
  );
}