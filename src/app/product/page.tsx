import { productsService } from "@/services/api/productsService";
import { Product } from "@/services/api/types";
import { Box, Container, Grid2 as Grid } from "@mui/material";
import { cookies } from "next/headers";
import PaginationClient from "../Pagination";
import LayoutContainer from "@/components/layout";
import { CannotGetData } from "@/components/common/errors/CannotGetData";
import ProductCard from "@/components/Home/ProductCard";

export default async function Products({
  searchParams,
  params,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  params: { slug: string };
}) {
  const searchParamsValue = await searchParams;
  const category = searchParamsValue['category']
  console.log(category)
  console.log('slug', params.slug)
  const page = Number(searchParamsValue["page"]) || 1;
  const perPage = 12;

  const { products }: { products: Product[] | null } =
    await productsService.getAllProducts();

  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  return (
    <LayoutContainer>
      <Container maxWidth="lg" sx={{ pb: 3 }}>
        <Grid container spacing={2} sx={{ marginTop: 8 }}>
          {products ? (
            products
              .slice((page - 1) * perPage, page * perPage)
              .map((product: Product) => (
                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard
                    product={product}
                    isShowAction={Boolean(token)}
                  />
                </Grid>
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
    </LayoutContainer>
  );
}
