import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Product } from "../../models/Product";

export const ProductItemCard = (props: { product: Product }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={(theme.palette.secondary as any)[700]}
          gutterBottom
        >
          {props.product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {props.product.name}
        </Typography>
        <Typography
          sx={{ mb: "1.5rem" }}
          color={(theme.palette.secondary as any)[400]}
        >
          ${Number(props.product.price).toFixed(2)}
        </Typography>
        <Rating value={props.product.rating} readOnly />

        <Typography variant="body2">{props.product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: (theme.palette.common as any)[300],
        }}
      >
        <CardContent>
          <Typography fontSize={".7rem"}>id: {props.product._id}</Typography>
          <Typography fontSize={".7rem"}>
            Supply Left: {props.product.supply}
          </Typography>
          <Typography fontSize={".7rem"}>
            Yearly Sales This Year: {props.product.stats.yearlySalesTotal}
          </Typography>
          <Typography fontSize={".7rem"}>
            Yearly Units Sold This Year:{" "}
            {props.product.stats.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
