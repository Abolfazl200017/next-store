import { Box, Grid2 as Grid, Typography } from "@mui/material";
import Link from "next/link";

type CategoriesImage = {
  name: string;
  img: string;
};
const categoriesImage: CategoriesImage[] = [
  {
    name: "لوازم الکترونیکی",
    img: "/images/categories/electronics.jpg",
  },
  {
    name: "جواهرات",
    img: "/images/categories/jewelery.jpg",
  },
  {
    name: "پوشاک مردانه",
    img: "images/categories/men's clothing.jpg",
  },
];

const Categories = () => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          width: 1,
          textAlign: "center",
        }}
      >
        کاوش در دسته‌بندی‌ها
      </Typography>
      <Typography
        sx={{
          fontSize: "1.25rem",
          color: "grey",
          width: 1,
          textAlign: "center",
        }}
      >
        با دسته‌بندی‌های متنوع در مجموعه کالاهایی که به دنبال آن هستید بگردید
      </Typography>

      <Grid container spacing={2} sx={{ marginTop: 8 }}>
        {categoriesImage.map((category) => (
          <Grid key={category.name} size={4}>
            <Link href={"/" + category.name}>
              <Box
                sx={{
                  width: 1,
                  aspectRatio: 3 / 4,
                  borderRadius: 3,
                  overflow: "hidden",
                  p: 1,
                  border: 1,
                  borderColor: "#dedede",
                }}
              >
                <Box
                  component="img"
                  src={category.img}
                  sx={{ width: 1, height: 1, objectFit: "contain" }}
                ></Box>
              </Box>
              <Typography
                sx={{
                  width: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.25rem",
                  mt: 3,
                }}
              >
                {category.name}
              </Typography>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Categories