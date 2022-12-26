import mongoose, { InferSchemaType, Schema } from "mongoose";

const affiliateStatSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  {
    timestamps: true,
  }
);

export const AffiliateStat = mongoose.model(
  "AffiliateStat",
  affiliateStatSchema
);

export type AffiliateStatType = InferSchemaType<typeof affiliateStatSchema>;
