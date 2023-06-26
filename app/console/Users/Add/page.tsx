"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { useRouter } from "next/navigation";

interface IUser {
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
}

const AddUser = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dpi, setDpi] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [work, setWork] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newUser: IUser = {
      name,
      username,
      email,
      password,
      dpi,
      address,
      phone,
      work,
      salary,
      role
    };

    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error(res.statusText);

      console.log("User Saved Successfully");
      router.push("/console/Users");
    } catch (error) {
      console.error("Error saving User:", error);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-6 text-3xl font-semibold text-violet-900">
        Add User
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
                  name={"Username"}
                  type={"text"}
                  placeholder={"Insert Username"}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form
                  name={"Email"}
                  type={"text"}
                  placeholder={"Insert Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form
                  name={"Password"}
                  type={"text"}
                  placeholder={"Insert Password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form
                  name={"DPI"}
                  type={"text"}
                  placeholder={"Insert DPI"}
                  onChange={(e) => setDpi(e.target.value)}
                />
                <Form
                  name={"Address"}
                  type={"text"}
                  placeholder={"Insert Address"}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Form
                  name={"Phone"}
                  type={"text"}
                  placeholder={"Insert Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Form
                  name={"Work"}
                  type={"text"}
                  placeholder={"Insert Work"}
                  onChange={(e) => setWork(e.target.value)}
                />
                <Form
                  name={"Salary"}
                  type={"text"}
                  placeholder={"Insert Salary"}
                  onChange={(e) => setSalary(e.target.value)}
                />
                <Form
                  name={"Role"}
                  type={"text"}
                  placeholder={"Insert Role"}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-5">
                <a
                  href="/console/Users"
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
