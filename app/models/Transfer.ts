import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { BankAccount, IBankAccount } from "./BankAccount";

export interface ITransfer extends Document {
  amount: number;
  senderAccount: string;
  receiverAccount: string;
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
      type: String,
      required: [true, "Cuenta de envío es requerida."],
    },
    receiverAccount: {
      type: String,
      required: [true, "Cuenta de destino es requerida."],
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

TransferSchema.pre<ITransfer>("save", async function (next: Function) {
  try {
    const senderAccountNumber = this.senderAccount;
    const receiverAccountNumber = this.receiverAccount;
    const amount = this.amount;

    // Fetch the sender account
    const senderAccount = await BankAccount.findOne({
      accNumber: senderAccountNumber,
    });
    const receiverAccount = await BankAccount.findOne({
      accNumber: receiverAccountNumber,
    });

    // Subtract and add the transfer amount from the sender's and receiver's account balance
    if (senderAccount && receiverAccount) {
      senderAccount.balance -= amount;
      receiverAccount.balance += amount;
      await senderAccount.save();
      await receiverAccount.save();
    } else {
      throw new Error("Sender account not found");
    }

    return next();
  } catch (error: any) {
    return next(error);
  }
});

const Transfer =
  models.Transfer || model<ITransfer>("Transfer", TransferSchema);

export default Transfer;
