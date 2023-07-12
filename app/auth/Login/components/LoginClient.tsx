"use client";

import React, { MouseEvent, useEffect, useRef } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/Images/Logos/NovarisLogo.png"

const LoginClient = () => {
  const inputUsername = useRef("");

  const inputPassword = useRef("");

  const onSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log({ user: inputUsername.current, pass: inputPassword.current });

    const result = await signIn("credentials", {
      username: inputUsername.current,
      password: inputPassword.current,
      redirect: true,
      callbackUrl: "/Home",
    });

    console.log({result: result})
  };
  return (
    <div className="bg-violet-100 dark:bg-violet-950 h-screen w-full login-bg z-0">
      <div className="flex flex-col items-center justify-center h-full  z-50">
        <div className="flex items-center justify-center mb-10 text-7xl font-bold text-gray-900 dark:text-white">
          <Image
            className="mr-2"
            src={logo}
            width={100}
            height={100}
            alt="logo"
          />
          Novaris
        </div>

        <div className="w-full bg-white rounded-xl shadow dark:border max-w-lg dark:bg-[#190a37] dark:border-violet-900">
          <div className="p-12 space-y-6">
            <h1 className="text-2xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => (inputUsername.current = e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-100 block w-full p-2.5 dark:bg-[#190a37]"
                  placeholder="Your username"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={(e) => (inputPassword.current = e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-100 block w-full p-2.5 dark:bg-[#190a37]"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => onSubmit(e)}
                className="bg-violet-800 hover:bg-violet-600  w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-300">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/Signup"
                  className="font-medium text-black hover:text-gray-600 dark:text-white dark:hover:text-gray-300 text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginClient;
