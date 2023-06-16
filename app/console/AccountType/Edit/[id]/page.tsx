"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Form from "@/app/console/components/Form";
import { IAccountTypePOST } from "@/app/models/AccountType";

export default function Page({ params }: { params: { id: string } }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [account, setAccount] = useState<IAccountTypePOST[]>([]);

  useEffect(() => {
    async function getAccountType() {
      const res = await fetch(`/api/accountType/${params.id}`, {
        next: { revalidate: 100 },
      });

      console.log("get BY ID")
      

      if (!res.ok) throw new Error(res.statusText);

      const account: IAccountTypePOST[] = await res.json();
      setAccount(account);
      console.log(account)
    }

    getAccountType();
  }, []);

  const handleSave = async () => {
    const newAccountType: IAccountTypePOST = {
      name,
      description,
    };

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
              {account.map((account: IAccountTypePOST, key) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
                  <Form
                    name={"Name"}
                    type={"text"}
                    placeholder={"Insert Name"}
                    defaultValue={account.name}
                    onChange={(e) => setName(e.target.value)}
                    key={key}
                  />
                  <Form
                    name={"Description"}
                    type={"text"}
                    placeholder={"Insert Description"}
                    defaultValue={account.description}
                    onChange={(e) => setDescription(e.target.value)}
                    key={key}
                  />
                </div>
              ))}

              <div className="flex justify-between mt-5">
                <Link
                  href="/console/AccountType"
                  className=" px-4 py-2 text-md font-normal text-white-900 bg-red-600 text-white rounded-xl max-w-fit hover:bg-red-500"
                >
                  Cancel
                </Link>
                <Link
                  href="/console/AccountType"
                  className="ml-2 px-4 py-2 text-md font-normal text-white-900 bg-violet-800 text-white rounded-xl max-w-fit hover:bg-violet-700"
                  onClick={() => handleSave()}
                >
                  Save
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
