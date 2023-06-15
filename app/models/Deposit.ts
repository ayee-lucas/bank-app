import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { IBankAccount } from "./BankAccount";

export interface IDeposit extends Document {
  amount: number;
  account: IBankAccount["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const DepositSchema = new Schema<IDeposit>(
  {
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: [true, "Cuenta es requerida."],
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

const Deposit = models.Deposit || model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
