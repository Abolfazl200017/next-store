import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-transition-progress/next";

export const CannotGetData = ({
  message = "مشکلی در دریافت اطلاعات پیش آمده لطفا مجددا تلاش نمایید",
}: {
  message?: string;
}) => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          height: '100vh',
          paddingTop: '100px',
        }}
      >
        <Box component="img" src="/images/no-data.svg" sx={{ maxWidth: 1, maxHeight: '100vh' }} />
        <Box
          sx={{
            position: "absolute",
            top: "50px",
            right: 0,
            width: 1,
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 'bold' }}>{message}</Typography>
        <Button size="large">
          <Link href="/">بازگشت به خانه</Link>
        </Button>
        </Box>
      </Box>
    </Container>
  );
};
