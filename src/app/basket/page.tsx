"use client";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useBasketStore from "@/store/basketStore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ProductActionsContainer from "@/components/common/ProductActions.tsx";
import { Link } from "react-transition-progress/next";
import { Product } from "@/services/api/types";
import { useState } from "react";

function BasketProduct({
  product,
}: {
  product: Product & { quantity: number };
}) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));
  const [isLoaded, setIsLoaded] = useState(false);
  const handleIsLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      sx={{
        width: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 3,
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          height: "100px",
          width: "100px",
          borderRadius: 4,
          overflow: "hidden",
          border: 1,
          flexShrink: 0,
        }}
        className="bg-secondary"
      >
        <Box
          component="img"
          src={product.image}
          sx={{
            width: 1,
            height: 1,
            objectFit: "cover",
            display: isLoaded ? "block" : "none",
          }}
          onLoad={handleIsLoaded}
        />
        {isLoaded ? null : (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
      </Box>
      <Box
        sx={{
          width: { xs: 1, sm: "calc(100% - 200px)" },
          textAlign: { xs: "center", sm: "start" },
        }}
      >
        <Link href={`/product/${product.id}`}>
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.title}
          </Typography>
        </Link>
        <Typography>
          {product.quantity}
          <Typography component="span" sx={{ mx: 1 }}>
            X
          </Typography>
          <Typography component="span" className="text-primary">
            {product.price}
          </Typography>
        </Typography>
      </Box>
      <ProductActionsContainer product={product} isVertical={isSmUp} />
    </Box>
  );
}

export default function BasketPage() {
  const { products, loading } = useBasketStore();
  const subtotal = (): number => {
    const total = products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    return Math.round(total * 100) / 100;
  };

  if (loading)
    return (
      <Box
        sx={{
          width: 1,
          height: "85vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );

  return (
    <>
      {products && products.length ? (
        <Container
          maxWidth="sm"
          sx={{
            minHeight: "calc(100vh - 120px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                width: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 1,
                py: 3,
                mb: 5,
                textAlign: "center",
                borderBottom: 1,
                borderColor: "#c4c4c4",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "2rem" }}>
                سبد خرید
              </Typography>
              <ShoppingBasketIcon sx={{ color: "#6a6a6a", fontSize: "2rem" }} />
            </Box>
            <Box>
              {products.map((product) => (
                <BasketProduct key={product.id} product={product} />
              ))}
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: 1,
                borderBottom: 1,
                pb: 2,
                mb: 3,
                borderColor: "#c4c4c4",
              }}
            >
              <Typography sx={{ width: 1 / 2, fontSize: "1.25rem" }}>
                جمع کل
              </Typography>
              <Typography
                sx={{ width: 1 / 2, fontSize: "1.25rem", fontWeight: "bold" }}
                className="text-primary"
              >
                {subtotal()} $
              </Typography>
            </Box>
            <Box>
              <Link href="/basket/checkout">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 5 }}
                >
                  ادامه خرید
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      ) : (
        <Container maxWidth="lg" sx={{ mb: 3 }}>
          <Box
            component="img"
            src="/images/empty-basket.svg"
            sx={{ width: 1 }}
          />
          <Typography variant="h5" sx={{ width: 1, textAlign: "center" }}>
            سبد خرید شما خالی است
          </Typography>
        </Container>
      )}
    </>
  );
}
