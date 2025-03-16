'use client';

import { useRouter } from "next/navigation";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useUserStore } from "@/stores/user.store";

const AdminPanelWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const { user } = useUserStore();

  const [finishTimeout, setFinishTimeout] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFinishTimeout(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (finishTimeout && !user) {
      router.push('/');
    } else if (user) {
      setAccessGranted(true);
    }
  }, [finishTimeout, user]);

  return accessGranted ? children : <></>;
}

export default AdminPanelWrapper;