"use client";

import { Button } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('authToken')
    router.push('/register')
  }

  return (
    <Button onClick={handleLogout} sx={{ color: "black", backgroundColor: "transparent" }}>
      خروج
    </Button>
  );
}
