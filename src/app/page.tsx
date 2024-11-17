import * as React from "react";
import { Box, Container, Grid2 as Grid, Typography } from "@mui/material";
import { productsService } from "@/services/api/productsService";
import { Product } from "@/services/api/types";
import PaginationClient from "./Pagination";
import Categories from "@/components/Home/Categories";
import ProductCard from "@/components/Home/ProductCard";
import Layout from "@/components/layout";
import { CannotGetData } from "@/components/common/errors/CannotGetData";
import { cookies } from 'next/headers'
import BannerCarousel from "@/components/Home/Banner";

export type JWT = {
  iat: string;
  user: string;
  sub: number;
}
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsValue = await searchParams;
  const page = Number(searchParamsValue["page"]) || 1;
  const perPage = 8;
  const { products }: { products: Product[] | null } =
    await productsService.getAllProducts();

  const cookieStore = await cookies()
  const token = cookieStore.get('authToken')

  return (
    <Layout>
      <Box>
        <Container maxWidth="xl" disableGutters>
          <BannerCarousel />
        </Container>
        <Container maxWidth="lg" sx={{ my: 8 }}>
          <Categories />

          <Typography
            id="products"
            sx={{
              width: 1,
              textAlign: "center",
              fontSize: "2.5rem",
              fontWeight: "bold",
              mt: 8,
            }}
          >
            محصولات ما
          </Typography>
          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            {products ? (
              products
                .slice((page - 1) * perPage, page * perPage)
                .map((product: Product) => (
                  <>
                    <Grid
                      key={product.id}
                      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                    >
                      <ProductCard product={product} isShowAction={Boolean(token)} />
                    </Grid>
                  </>
                ))
            ) : (
              <CannotGetData />
            )}
          </Grid>
          {products ? (
            <Box
              sx={{
                mt: 5,
                width: 1,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PaginationClient
                total={products ? Math.ceil(products.length / perPage) : 0}
                currentPage={page}
              />
            </Box>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </Layout>
  );
}
