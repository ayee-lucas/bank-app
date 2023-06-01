import { Document, Schema, model, models } from "mongoose";
import { IUser } from "./User";
import { IAccountType } from "./AccountType";

export interface IBankAccount extends Document {
  accNumber: string;
  client: IUser["_id"];
  currency: string;
  balance: number;
  accountType: IAccountType["_id"];
  // Otros campos específicos de la cuenta bancaria
}

const bankAccountSchema = new Schema<IBankAccount>(
  {
    accNumber: {
      type: String,
      required: false,
      unique: true,
      default: generateRandomAccountNumber,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Usuario es requerido."],
    },
    currency: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: [true, "Saldo es requerido."],
    },
    accountType: {
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

// Function to generate a unique random account number
async function generateUniqueAccountNumber(): Promise<string> {
  let accountNumber = generateRandomAccountNumber();
  const BankAccountModel =
    models.BankAccount || model<IBankAccount>("BankAccount", bankAccountSchema);
  let exists = await BankAccountModel.exists({ accNumber: accountNumber });
  while (exists) {
    accountNumber = generateRandomAccountNumber();
    exists = await BankAccountModel.exists({ accNumber: accountNumber });
  }
  return accountNumber;
}

export const BankAccount =
  models.BankAccount || model<IBankAccount>("BankAccount", bankAccountSchema);
