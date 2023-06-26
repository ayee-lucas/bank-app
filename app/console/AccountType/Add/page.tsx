"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { IAccountTypePOST } from "@/app/models/AccountType";
import { useRouter } from "next/navigation";

const AddAccountType = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newAccountType: IAccountTypePOST = {
      name,
      description,
    };

    try {
      const res = await fetch("/api/accountType", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAccountType),
      });

      if (!res.ok) throw new Error(res.statusText);

      console.log("AccountType Saved Successfully");
      router.push("/console/AccountType");
    } catch (error) {
      console.error("Error saving AccountType:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Add Account Type
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
                  onChange={(e) => setName(e.target.value)}
                />
                <Form
                  name={"Description"}
                  type={"text"}
                  placeholder={"Insert Description"}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-5">
                <a
                  href="/console/AccountType"
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

export default AddAccountType;
