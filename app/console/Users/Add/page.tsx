"use client";

import React, { useState } from "react";
import Form from "../../components/Form";
import { useRouter } from "next/navigation";
import { AiOutlineDown } from "react-icons/ai";

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

  const [dropDown, setDropDown] = useState(false);

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
    
    console.log(newUser)

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
                  type={"email"}
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

                <div className="">
                    <label className="text-gray-700 dark:text-gray-300">Role</label>
                    <button
                      className="bg-gray-100 border w-full h-9 px-2 py-1 rounded-md focus:border-indigo-600 text-gray-400 text-left"
                      onClick={(e)=> { 
                        e.preventDefault()
                        setDropDown(!dropDown)
                      }}
                    >
                      <div className="flex justify-between">
                        {
                          role == "" ?
                          <span className="text-gray-400">Choose Role</span>
                          : 
                          <span className="text-black">{role}</span>
                        }
                        <div className="flex items-center">
                          <AiOutlineDown className="w-5 h-4"/>
                        </div>
                      </div>
                    </button>

                    {
                      dropDown ?
                      <div className="flex justify-end">
                        <div className="fixed justify-end w-44 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"  onClick={(e) => {setDropDown(!dropDown); setRole("admin")}}>admin</span>
                            </li>
                            <li>
                              <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"  onClick={(e) => {setDropDown(!dropDown); setRole("user")}}>user</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      : null
                    }
                 </div>

                 <Form
                  name={"Salary"}
                  type={"text"}
                  placeholder={"Insert Salary"}
                  onChange={(e) => setSalary(e.target.value)}
                />

              </div>

              <div className="flex justify-between mt-10">
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
