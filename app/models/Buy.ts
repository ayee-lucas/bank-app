import { Document, Schema, model, models } from "mongoose";
import { IBankAccount } from "./BankAccount";

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

const Buy = models.Buy || model<IBuy>("Buy", BuySchema);

export default Buy;
