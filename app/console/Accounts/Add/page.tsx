"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { useRouter } from "next/navigation";

interface IUser {
  currency: string;
  balance: number;
  client: string;
  accountType: string;
}

const AddUser = () => {
  const [currency, setCurrency] = useState("");
  const [balance, setBalance] = useState(0);
  const [client, setClient] = useState("");
  const [accountType, setAccountType] = useState("");
  const router = useRouter();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newUser: IUser = {
      currency,
      balance,
      client,
      accountType
    };

    try {
      const res = await fetch("/api/bankAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error(res.statusText);

      console.log("Bank Account Saved Successfully");
      router.push("/console/Accounts");
    } catch (error) {
      console.error("Error saving Bank Account:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Add Bank Account
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
                  name={"Currency"}
                  type={"text"}
                  placeholder={"Insert Currency"}
                  onChange={(e) => setCurrency(e.target.value)}
                />
                <Form
                  name={"Balance"}
                  type={"text"}
                  placeholder={"Insert Balance"}
                  onChange={(e) => setBalance(e.target.valueAsNumber)}
                />
                <Form
                  name={"Client"}
                  type={"text"}
                  placeholder={"Insert Client"}
                  onChange={(e) => setClient(e.target.value)}
                />
                <Form
                  name={"AccountType"}
                  type={"text"}
                  placeholder={"Insert Account Type"}
                  onChange={(e) => setAccountType(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-5">
                <a
                  href="/console/Accounts"
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

export default AddUser;
