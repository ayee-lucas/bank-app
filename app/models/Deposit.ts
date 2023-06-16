import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { BankAccount, IBankAccount } from "./BankAccount";

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

DepositSchema.pre<IDeposit>("save", async function (next: Function) {
  try {
    const accountId = this.account;
    const amount = this.amount;

    // Fetch the sender account
    const account = await BankAccount.findById(accountId);

    // Subtract the purchase amount from the sender's account balance
    if (account) {
      account.balance += amount;
      await account.save();
    } else {
      throw new Error("Sender account not found");
    }

    return next();
  } catch (error: any) {
    return next(error);
  }
});

const Deposit = models.Deposit || model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
