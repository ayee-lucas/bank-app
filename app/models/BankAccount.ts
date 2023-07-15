import { Document, Schema, model, models } from "mongoose";
import User, { IUser } from "./User";
import { IAccountType } from "./AccountType";
import { IBuy } from "./Buy";
import { IDeposit } from "./Deposit";
import { ITransfer } from "./Transfer";

export interface IBankAccount extends Document {
  accNumber: string;
  client: IUser["_id"];
  balance: number;
  accountType: IAccountType["_id"];
  buys?: IBuy[];
  deposits?: IDeposit[];
  transfers?: ITransfer[];
  isSaved?: boolean;
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
    balance: {
      type: Number,
      required: [true, "Saldo es requerido."],
    },
    accountType: {
      type: Schema.Types.ObjectId,
      ref: "AccountType",
      required: [true, "Tipo de cuenta es requerido."],
    },
    buys: [
      {
        type: Schema.Types.ObjectId,
        ref: "Buy",
      },
    ],
    deposits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Deposit",
      },
    ],
    transfers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transfer",
      },
    ],
    isSaved: {
      type: Boolean,
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

bankAccountSchema.pre<IBankAccount>("save", async function (next) {
  // Verificar si el documento ya ha sido guardado
  if (this.isSaved) {
    return next();
  }

  const user = await User.findById(this.client);

  if (user) {
    // Verificar si la cuenta ya existe en el usuario
    const existingAccount = user.accounts.includes(this._id);
    if (!existingAccount) {
      user.accounts.push(this._id);
      await user.save();
    }
  }

  // Marcar el documento como guardado
  this.isSaved = true;

  next();
});

export const BankAccount =
  models.BankAccount || model<IBankAccount>("BankAccount", bankAccountSchema);
