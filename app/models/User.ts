import { Document, Schema, model, models } from "mongoose";

// Interface for User document
export interface IUser extends Document {
  accNumber: string;
  name: string;
  username: string;
  email: string;
  password: string;
  dpi: string;
  address: string;
  phone: string;
  work: string;
  salary: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for User
const userSchema = new Schema<IUser>(
  {
    accNumber: {
      type: String,
      required: true,
      unique: true,
      default: generateRandomAccountNumber,
    },
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    dpi: {
      type: String,
      required: true,
      minlength: 13,
      maxlength: 13,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    work: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
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

// Function to generate a random account number
function generateRandomAccountNumber(): string {
  const accountNumber = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
  return accountNumber;
}

// Create and export the User model
const User = models.User || model<IUser>("User", userSchema);

export default User;
