"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Form from "@/app/console/components/Form";
import { updatedDate } from "@/app/tools/datesFormatter";
import AccountType from "../../page";

interface AccountType {
  name: string;
  description: string;
  updatedAt: Date;
}

export default function Page({ params }: { params: { id: string } }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [updatedAt, setUpdatedAt] = useState(new Date(Date.now()));
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [account, setAccount] = useState<AccountType>();

  useEffect(() => {
    async function getAccountType() {
      const res = await fetch(`/api/accountType/${params.id}`, {
        next: { revalidate: 100 },
      });

      if (!res.ok) {
        setError(true);
      }

      const account: AccountType = await res.json();
      setAccount(account);
      setLoading(false);
    }

    getAccountType();
  }, []);

  const handleSave = async () => {

    //Change updatedAd to the actual Date
    setUpdatedAt(updatedAt)
    updatedDate(updatedAt);

    const newAccountType: AccountType = {
      name,
      description,
      updatedAt
    };

    if(newAccountType.name == "") newAccountType.name = `${account?.name}`
    if(newAccountType.description == "") newAccountType.description = `${account?.description}`

    try {
      const res = await fetch(`/api/accountType/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccountType),
      });

      if (!res.ok) throw new Error(res.statusText);
    } catch (error) {
      console.error("Error updating AccountType:", error);
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
        Edit Account Type
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
                  name={"Name"}
                  type={"text"}
                  placeholder={"Insert Name"}
                  defaultValue={account?.name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form
                  name={"Description"}
                  type={"text"}
                  placeholder={"Insert Description"}
                  defaultValue={account?.description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex justify-between mt-5">
                <Link
                  href="/console/AccountType"
                  className=" px-4 py-2 text-md font-normal text-white-900 bg-red-600 text-white rounded-xl max-w-fit hover:bg-red-500"
                >
                  Cancel
                </Link>
                <a
                  href="/console/AccountType"
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
