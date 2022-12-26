import { MongoObject } from "./Mongo-Object";

export interface User extends MongoObject {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  occupation: string;
  phoneNumber: string;
  transactions: string[];
  role: string;
}
