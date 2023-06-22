import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { BankAccount, IBankAccount } from "./BankAccount";

export interface IDeposit extends Document {
  amount: number;
  account: string;
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
      type: String,
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
    const accountNumber = this.account;
    const amount = this.amount;

    // Fetch the account
    const account = await BankAccount.findOne({ accNumber: accountNumber });

    // Add the deposit amount to the account balance
    if (account) {
      account.balance += amount;
      await account.save();
    } else {
      throw new Error("Account not found");
    }

    return next();
  } catch (error: any) {
    return next(error);
  }
});

const Deposit = models.Deposit || model<IDeposit>("Deposit", DepositSchema);

export default Deposit;
