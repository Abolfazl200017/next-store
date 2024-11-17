import { siteConfig } from "@/constants";
import { Box, Typography } from "@mui/material";
import React from "react";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

function LogoName() {
  return (
    <Link href="/">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box component="img" src="/images/logo.webp" sx={{ height: 50 }} />
        <Typography variant="h1">{siteConfig.name}</Typography>
      </Box>
    </Link>
  );
}

function LinkList() {
  const Links = [
    { name: "خانه", href: "/" },
    { name: "محصولات", href: "/" },
    { name: "درباره ما", href: "/" },
  ];

  return (
    <Box
      component="ul"
      sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
    >
      {Links.map((link) => (
        <Link href={link.href} key={link.name}>
          <Typography sx={{ fontWeight: "bold", paddingX: 1, color: "black" }}>
            {link.name}
          </Typography>
        </Link>
      ))}
    </Box>
  );
}

function LoginOrBasket({ user }: { user: string | null }) {
  const isLoggedIn = !!user;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {isLoggedIn ? (
        <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", mx: 1 }}>
            {user}
            {/* <AccountCircleIcon sx={{ mr: 1 }} /> */}
          </Box>
          <Link href="/basket">
            <ShoppingBasketIcon />
          </Link>
        </Box>
      ) : (
        <Link href="/register">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ ml: 1 }}>ورود</Typography>
            <LoginIcon />
          </Box>
        </Link>
      )}
    </Box>
  );
}

export const HeaderContainer: React.FC<{ user: string | null }> = ({
  user,
}) => {
  return (
    <header>
      <Box
        sx={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 1,
            maxWidth: "1280px",
            paddingX: 3,
            paddingY: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <LogoName />
          <LinkList />
          <LoginOrBasket user={user} />
        </Box>
      </Box>
    </header>
  );
};
