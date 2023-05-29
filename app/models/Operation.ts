import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { IOperationType } from "./OperationType";

// Interface for BankOperation document
export interface IOperation extends Document {
  operationType: IOperationType["_id"];
  amount: number;
  senderAccount: IUser["_id"];
  receiverAccount: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for BankOperation
const OperationSchema = new Schema<IOperation>(
  {
    operationType: {
      type: Schema.Types.ObjectId,
      ref: "OperationType",
      required: [true, "Tipo de Operacion es requerido."],
    },
    amount: {
      type: Number,
      required: true,
    },
    senderAccount: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cuenta de envio es requerido."],
    },
    receiverAccount: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Cuenta de destino es requerido."],
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
const Operation =
  models.Operation || model<IOperation>("Operation", OperationSchema);

export default Operation;
