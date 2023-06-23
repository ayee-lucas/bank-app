import { Document, Schema, model, models } from "mongoose";
import { BankAccount, IBankAccount } from "./BankAccount";

export interface IBuy extends Document {
  amount: number;
  senderAccount: string;
  recipient: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const BuySchema = new Schema<IBuy>(
  {
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value <= 10000;
        },
        message: "El monto máximo permitido es de 10000.",
      },
    },
    senderAccount: {
      type: String,
      required: [true, "Cuenta de envío es requerida."],
    },
    recipient: {
      type: String,
      required: [true, "Se requiere la empresa que realizó el cobro."],
    },
    description: {
      type: String,
      required: [true, "Información del cobro es requerida."],
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

BuySchema.pre<IBuy>("save", async function (next: Function) {
  try {
    const senderAccountNumber = this.senderAccount;
    const amount = this.amount;

    // Fetch the sender account
    const senderAccount = await BankAccount.findOne({
      accNumber: senderAccountNumber,
    });

    // Subtract the purchase amount from the sender's account balance
    if (senderAccount) {
      senderAccount.balance -= amount;
      await senderAccount.save();
    } else {
      throw new Error("Sender account not found");
    }

    return next();
  } catch (error: any) {
    return next(error);
  }
});

BuySchema.post("findOneAndDelete", async function (doc: IBuy) {
  try {
    const senderAccountNumber = doc.senderAccount;
    const amount = doc.amount;

    // Fetch the sender account
    const senderAccount = await BankAccount.findOne({
      accNumber: senderAccountNumber,
    });

    // Revert the purchase amount to the sender's account balance
    if (senderAccount) {
      senderAccount.balance += amount;
      await senderAccount.save();
    } else {
      throw new Error("Sender account not found");
    }
  } catch (error: any) {
    console.log(error);
  }
});

const Buy = models.Buy || model<IBuy>("Buy", BuySchema);

export default Buy;
