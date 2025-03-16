'use client'

import { AntdRegistry } from "@ant-design/nextjs-registry"

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AntdRegistry>{children}</AntdRegistry>
  )
}