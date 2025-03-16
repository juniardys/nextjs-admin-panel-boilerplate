'use client';

import { useUserStore } from "@/stores/user.store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const IndexMain: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const [finishTimeout, setFinishTimeout] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFinishTimeout(true);
    }, 1000);
  }, []);

  useEffect(() => {
    console.log('user', user)
    if (finishTimeout && !user) {
      router.push('/login');
    } else if (user) {
      router.push('/dashboard');
    }
  }, [finishTimeout, user]);

  return <></>;
}

export default IndexMain;