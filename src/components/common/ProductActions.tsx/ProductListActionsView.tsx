import { theme } from "@/theme/theme";
import { Box, Button, Typography } from "@mui/material";

export type BasketActions = {
  isProductInBasket: boolean;
  increaseQuantity: () => void;
  decreaseQuantity: () => void;
  handleAddToBasket: () => void;
  getQuantity: () => number;
  isVertical: boolean;
};

function ProductListActionsView ({ isProductInBasket, increaseQuantity, decreaseQuantity ,handleAddToBasket, getQuantity, isVertical }: BasketActions) {
  return (
    <Box>
      {isProductInBasket ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: isVertical ? 'column-reverse' : 'row',
            justifyContent: "space-between",
            alignItems: "center",
            border: 1,
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 3,
            color: "black",
            height: isVertical ? '100px' : '40px',
            overflow: 'hidden',
          }}
        >
          <Button
            variant="text"
            sx={{
              color: "black",
              fontSize: "1.5rem",
              height: isVertical? '30px' : 1,
              width: isVertical ? 1 : "auto",
              padding: isVertical ? 0 : 'auto',
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={decreaseQuantity}
          >
            -
          </Button>
          <Typography sx={{ px: 1 }}>
            {getQuantity()}
          </Typography>
          <Button
            variant="text"
            sx={{
              color: "black",
              fontSize: "1.1rem",
              height: isVertical? '30px' : 1,
              width: isVertical ? 1 : "auto",
              padding: isVertical ? 0 : 'auto',
              ":hover": { backgroundColor: "transparent" },
            }}
            onClick={increaseQuantity}
          >
            +
          </Button>
        </Box>
      ) : (
        <Button
          variant="text"
          sx={{
            backgroundColor: "white",
            borderRadius: 0,
            px: 3,
            py: 1,
          }}
          onClick={handleAddToBasket}
        >
          افزودن به سبد
        </Button>
      )}
    </Box>
  )
}

export default ProductListActionsView