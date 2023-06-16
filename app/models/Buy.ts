import { Document, Schema, model, models } from "mongoose";
import { BankAccount, IBankAccount } from "./BankAccount";

export interface IBuy extends Document {
  amount: number;
  senderAccount: IBankAccount["_id"];
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
    },
    senderAccount: {
      type: Schema.Types.ObjectId,
      ref: "BankAccount",
      required: [true, "Cuenta de envio es requerido."],
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
    const senderAccountId = this.senderAccount;
    const amount = this.amount;

    // Fetch the sender account
    const senderAccount = await BankAccount.findById(senderAccountId);

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

const Buy = models.Buy || model<IBuy>("Buy", BuySchema);

export default Buy;
