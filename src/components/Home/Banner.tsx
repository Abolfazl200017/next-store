'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { theme } from "@/theme/theme";
import { Box, Button, Typography } from "@mui/material";

const Banner = () => (
  <Box
    sx={{
      width: 1,
      aspectRatio: 16 / 9,
      objectFit: "cover",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    <Box
      component="img"
      src="/images/Banner.png"
      sx={{ objectFit: "cover", width: 1, height: 1 }}
    />
    <Box
      sx={{
        width: 1 / 2,
        aspectRatio: "16/9",
        paddingX: "5%",
        paddingY: 3,
        position: "absolute",
        left: 24,
        top: "auto",
        bottom: "auto",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      className="bg-secondary text-primary"
    >
      <Typography
        sx={{
          color: "black",
          fontWeight: "bold",
          display: { xs: "none", md: "block" },
        }}
      >
        محصولات جدید
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginY: 1,
          fontSize: { xs: "1rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        گردش در
        <br />
        کالکشن‌ پاییزی
      </Typography>
      <Typography sx={{ color: "black", display: { xs: "none", md: "block" } }}>
        محصولات جدید در تنوع و کیفیت بسیار بالا و قیمت رقابتی موجود شدند
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
        <Button
          variant="contained"
          sx={{
            paddingX: { xs: 1, sm: 3, md: 5 },
            paddingY: { xs: 1, md: 2 },
            fontWeight: "bold",
            borderRadius: 0,
            boxShadow: "none",
            ":hover": {
              backgroundColor: theme.palette.primary.main,
            }
          }}
        >
          الان بخرید
        </Button>
      </Box>
    </Box>
  </Box>
);

const BannerCarousel = () => {
  const setting = {
    spaceBetween: 50,
      slidesPerView: 1,
      autoplay: true
  }
  return (
    <Swiper
      {...setting}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide key='banner-1'><Banner /></SwiperSlide>
    </Swiper>
  )
}

export default BannerCarousel;
