import { Document, Schema, model, models } from "mongoose";

// Interface for BankOperation document
export interface IOperationType extends Document {
  operationName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for BankOperation
const OperationTypeSchema = new Schema<IOperationType>(
  {
    operationName: {
      type: String,
      required: true,
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

// Create and export the BankOperation model
const OperationType =
  models.OperationType ||
  model<IOperationType>("OperationType", OperationTypeSchema);

export default OperationType;
