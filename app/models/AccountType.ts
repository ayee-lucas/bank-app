import { Document, Schema, model, models } from "mongoose";

// Interface for AccountType document
export interface IAccountType extends Document {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAccountTypePOST {
  _id?: any;
  name: string;
  description: string;
}

// Mongoose schema for AccountType
const accountTypeSchema = new Schema<IAccountType>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Create and export the AccountType model
const AccountType =
  models.AccountType || model<IAccountType>("AccountType", accountTypeSchema);

export default AccountType;
