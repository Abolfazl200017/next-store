import { CannotGetData } from "@/components/common/errors/CannotGetData";
import ProductActionsContainer from "@/components/common/ProductActions.tsx";
import Layout from "@/components/layout";
import { productsService } from "@/services/api/productsService";
import { Box, Container, Rating, Typography } from "@mui/material";
import { cookies } from "next/headers";

interface ProductPageProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = (await params).productId;
  const { product } = await productsService.getSingleProduct(id);
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");

  if (!product) {
    return <CannotGetData />;
  }

  return (
    <Layout>
      <Box sx={{ py: 5, width: 1 }} className="bg-secondary">
        <Container maxWidth="lg">
          <Typography sx={{}}>
            {`خانه  > ‌ محصولات  >  ${product.title}`}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Box
          sx={{
            display: { xs: "block", sm: "flex" },
            alignItems: "center",
            gap: 5,
          }}
        >
          <Box
            component="img"
            src={product.image}
            sx={{ width: { xs: 1, sm: 1 / 3 }, mb: { xs: 3, sm: 0 } }}
          />
          <Box>
            <Typography variant="h1">{product.title}</Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "grey",
                fontSize: "2.5rem",
                mt: 1,
              }}
            >
              {product.price} $
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Rating name="read-only" value={product.rating.rate} readOnly />
              <Box
                sx={{
                  height: "50px",
                  width: "1px",
                  backgroundColor: "grey",
                  mx: 3,
                }}
              />
              <Typography sx={{ color: "grey" }}>
                {`دیدگاه ${product.rating.count} کاربر`}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: "0.9rem", mt: 2 }}>
              {product.description}
            </Typography>
            {!token ? (
              <></>
            ) : (
              <ProductActionsContainer product={product} type="single" />
            )}
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
