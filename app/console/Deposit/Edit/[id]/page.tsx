"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Form from "@/app/console/components/Form";
import { updatedDate } from "@/app/tools/datesFormatter";
import Deposit from "../../page"

interface Deposit {
  account: string;
  amount: string;
  updatedAt: Date;
}

export default function EditDepositPage({ params }: { params: { id: string } }) {

  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date(Date.now()));
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [deposit, setDeposit] = useState<Deposit>();

  useEffect(() => {
    async function getDeposit() {
      const res = await fetch(`/api/deposit/${params.id}`, {
        next: { revalidate: 100 },
      });

      if (!res.ok) {
        setError(true);
      }

      const deposit: Deposit = await res.json();
      setDeposit(deposit);
      setLoading(false);
    }

    getDeposit();
  }, []);

  const handleSave = async () => {

    //Change updatedAd to the actual Date
    setUpdatedAt(updatedAt)
    updatedDate(updatedAt);

    const newDeposit: Deposit = {
      account,
      amount,
      updatedAt
    };

    if(newDeposit.account == "") newDeposit.account = `${deposit?.account}`
    if(newDeposit.amount == "") newDeposit.amount = `${deposit?.amount}`

    try {
      const res = await fetch(`/api/deposit/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDeposit),
      });

      if (!res.ok) throw new Error(res.statusText);
    } catch (error) {
      console.error("Error updating Deposit:", error);
    }
  };


  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>An error has occurred</div>;
  }

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Edit Deposit
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
                  defaultValue={deposit?.account}
                  onChange={(e) => setAccount(e.target.value)}
                />
                <Form
                  name={"Amount"}
                  type={"text"}
                  placeholder={"Insert Amount"}
                  defaultValue={deposit?.amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-5">
                <Link
                  href="/console/Deposit"
                  className=" px-4 py-2 text-md font-normal text-white-900 bg-red-600 text-white rounded-xl max-w-fit hover:bg-red-500"
                >
                  Cancel
                </Link>
                <a
                  href="/console/Deposit"
                  className="ml-2 px-4 py-2 text-md font-normal text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-700"
                  onClick={() => handleSave()}
                >
                  Save
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}