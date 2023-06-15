import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { IBankAccount } from "./BankAccount";

export interface ITransfer extends Document {
  amount: number;
  senderAccount: IBankAccount["_id"];
  receiverAccount: IBankAccount["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const TransferSchema = new Schema<ITransfer>(
  {
    amount: {
      type: Number,
      required: true,
    },
    senderAccount: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: [true, "Cuenta de envio es requerido."],
    },
    receiverAccount: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
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

const Transfer =
  models.Transfer || model<ITransfer>("Transfer", TransferSchema);

export default Transfer;
