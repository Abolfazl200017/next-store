import { ReactNode } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { JWT } from "@/app/page";

interface LayoutProps {
  children: ReactNode;
}

export const LayoutContainer: React.FC<LayoutProps> = async ({ children }) => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("authToken")?.value
  const user: string | null = token ? (jwtDecode(token) as JWT ).user : null;
  
  return (
    <Box
      sx={{
        padding: 0,
        margin: 0,
      }}
    >
      <Box sx={{ minHeight: "100vh", paddingX: "auto" }}>
        <Header user={user} />
        <Box component="main" sx={{ minHeight: "100%" }}>
          {children}
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};
