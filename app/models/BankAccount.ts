import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { IAccountType } from "./AccountType";

export interface ICuentaBancaria extends Document {
  accNumber: string;
  cliente: IUser["_id"];
  numeroCuenta: string;
  currency: string;
  saldo: number;
  tipoCuenta: IAccountType["_id"];
  // Otros campos específicos de la cuenta bancaria
}

const cuentaBancariaSchema = new Schema<ICuentaBancaria>(
  {
    accNumber: {
      type: String,
      required: true,
      unique: true,
      default: generateRandomAccountNumber,
    },
    cliente: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Usuario es requerido."],
    },
    numeroCuenta: {
      type: String,
      required: [true, "Número de cuenta es requerido."],
    },
    currency: {
      type: String,
      required: true,
    },
    saldo: {
      type: Number,
      required: [true, "Saldo es requerido."],
    },
    tipoCuenta: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      required: [true, "Tipo de cuenta es requerido."],
    },
    // Otros campos específicos de la cuenta bancaria
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Function to generate a random account number
function generateRandomAccountNumber(): string {
  const accountNumber = Math.floor(Math.random() * 100000000)
    .toString()
    .padStart(8, "0");
  return accountNumber;
}

export const CuentaBancaria =
  models.CuentaBancaria ||
  model<ICuentaBancaria>("CuentaBancaria", cuentaBancariaSchema);
