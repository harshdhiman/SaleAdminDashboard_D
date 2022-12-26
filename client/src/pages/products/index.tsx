import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Header } from "../../components/header";
import { useGetProductsQuery } from "../../state/api";
import { ProductItemCard } from "./product-item-card";

export const Products = () => {
  const products = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {products.data ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products.data.map((product) => {
            return <ProductItemCard key={product._id} product={product} />;
          })}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};
