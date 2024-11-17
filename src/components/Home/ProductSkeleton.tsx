import { Card, CardActions, CardContent, Skeleton } from "@mui/material";

const ProductSkeleton = () => {
  return (
    <Card
      sx={{
        boxShadow: "none",
        borderRadius: 0,
        border: 1,
        borderColor: "#f4f5f7",
      }}
      className="bg-grey"
    >
      <Skeleton
        sx={{ width: 1, aspectRatio: "1/1", backgroundColor: "#f0f0f0" }}
        variant="rectangular"
      />
      <CardContent>
        <Skeleton width="60%" height={24} />
        <Skeleton width="40%" height={20} />
        <Skeleton width="80%" height={30} />
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Skeleton width="80%" height={36} />
      </CardActions>
    </Card>
  );
};

export default ProductSkeleton;
