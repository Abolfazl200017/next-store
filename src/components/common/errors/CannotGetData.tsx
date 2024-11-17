import { Box, Typography } from "@mui/material";

export const CannotGetData = () => {
  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box component="img" src="/images/no-data.svg" />
      <Typography sx={{ fontSize: "1.5rem" }}>
        مشکلی در دریافت اطلاعات پیش آمده لطفا مجددا تلاش نمایید
      </Typography>
    </Box>
  );
};
