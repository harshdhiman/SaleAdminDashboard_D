import mongoose, { InferSchemaType } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    //
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);

export type UserType = InferSchemaType<typeof UserSchema>;
