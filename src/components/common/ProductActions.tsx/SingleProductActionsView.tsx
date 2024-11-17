import { Box, Button, Rating, Typography } from "@mui/material";
import { BasketActions } from "./ProductListActionsView";

function SingleProductActionsView({
  isProductInBasket,
  increaseQuantity,
  decreaseQuantity,
  handleAddToBasket,
  getQuantity,
}: BasketActions) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 3, gap: 3 }}>
      {isProductInBasket ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: 1,
            borderColor: "grey",
            borderRadius: 3,
            color: "black",
            height: "60px",
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "black",
              fontSize: "1.5rem",
              height: 1,
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <Typography sx={{ px: 1 }}>{getQuantity()}</Typography>
          <Button
            variant="text"
            sx={{
              color: "black",
              fontSize: "1.1rem",
              height: 1,
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={increaseQuantity}
          >
            +
          </Button>
        </Box>
      ) : (
        <Button
          size="large"
          variant="outlined"
          sx={{
            color: "black",
            borderColor: "black",
            borderRadius: 3,
            height: "60px",
          }}
          onClick={handleAddToBasket}
        >
          افزودن به سبد خرید
        </Button>
      )}
    </Box>
  );
}

export default SingleProductActionsView;
