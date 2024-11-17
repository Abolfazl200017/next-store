import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-transition-progress/next";

export const CannotGetData = ({ message='مشکلی در دریافت اطلاعات پیش آمده لطفا مجددا تلاش نمایید' } : { message?: string }) => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="img" src="/images/no-data.svg" />
        <Typography sx={{ fontSize: "1.5rem", mt: -12 }}>
          { message }
        </Typography>
        <Button size='large'>
          <Link href='/'>
            بازگشت به خانه
          </Link>
        </Button>
      </Box>
    </Container>
  );
};
