"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { IAccountTypePOST } from "@/app/models/AccountType";
import { useRouter } from "next/navigation";

interface IDeposit{
    account: string
    amount: number
}

export default function AddDepositPage() {

  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const router = useRouter();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newDeposit: IDeposit = {
        account,
        amount,
    };

    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeposit),
      });

      if (!res.ok) throw new Error(res.statusText);

      console.log("Deposit Saved Successfully");
      router.push("/console/Deposit");
    } catch (error) {
      console.error("Error saving Deposit:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Add Deposit
      </div>

      <div>
        <div className="p-6 pt-0">
          <div className="p-6 bg-white dark:bg-slate-800 rounded-md shadow-md">
            <h2 className="text-xl text-gray-800 dark:text-white font-semibold capitalize">
              Credentials:
            </h2>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                <Form
                  name={"Account"}
                  type={"text"}
                  placeholder={"Insert Account"}
                  onChange={(e) => setAccount(e.target.value)}
                />
                <Form
                  name={"Amount"}
                  type={"number"}
                  placeholder={"Insert Amount"}
                  onChange={(e) => setAmount(e.target.valueAsNumber)}
                />
              </div>

              <div className="flex justify-between mt-5">
                <a
                  href="/console/Deposit"
                  className=" px-4 py-2 text-md font-normal text-white-900 bg-red-600 text-white rounded-xl max-w-fit hover:bg-red-500"
                >
                  Cancel
                </a>
                <button
                  onClick={(e) => handleSave(e)}
                  className="ml-2 px-4 py-2 text-md font-normal text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};