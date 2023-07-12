'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from './FormInput';
import { SignUpAction } from '@/app/api/register/Actions';

function SignUpForm() {

  const [password, setPassword] = useState('');

  const [data, setData] = useState({});

  const [confirmPassword, setConfirmPassword] = useState('');

  const [validPassword, setValidPassword] = useState(true);

  const [responseError, setResponseError] = useState('');

  const [defaultError, setDefaultError] = useState(true);

  const router = useRouter();

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    const response:any = await SignUpAction(data)
    console.log(response);

    if(response.message === "success" ){
      setResponseError("");
      router.push('/auth/Login');
    }else{
      setDefaultError(false);
      setResponseError(`${response.message}`)
    }


  };

  useEffect(() => {
    if (password !== confirmPassword) {
      /** Password don't match */
      setValidPassword(false);
      setResponseError('');
    } else {
      setValidPassword(true);
      setData({ ...data, password });
    }
  }, [password, confirmPassword]);

  return (
    <div className="w-full h-full flex justify-center items-center">
    <form
      action=""
      className="w-full h-full min-h-[200px] p-2"
    >

    <h1 className="text-2xl text-center pb-4 font-semibold leading-tight tracking-tight text-gray-900 dark:text-white">Create an Account</h1>

      {responseError !== '' ? (
        <h1 className="text-red-600 text-sm px-2 font-medium italic">
          {responseError}
        </h1>
      ) : null}
      <FormInput
        label="Username"
        placeholder="Enter your username"
        error={defaultError}
        type="text"
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>,
        ) => setData({ ...data, username: e.target.value })}
      />
      <FormInput
        error={defaultError}
        label="Email"
        placeholder="Enter your email"
        onChange={(
          e: React.ChangeEvent<HTMLInputElement>,
        ) => setData({ ...data, email: e.target.value })}
        type="email"
      />
      <div className="relative flex justify-between items-center gap-4">
        <div className="flex justify-between items-center gap-4 h-full">
          <FormInput
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            error={validPassword}
          />
        </div>

        <div className="flex justify-between items-center gap-4 h-full">
          <FormInput
            label="Confirm Password"
            placeholder="Enter your password"
            type="password"
            error={validPassword}
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      {validPassword ? null : (
        <h1 className="text-red-600 text-sm px-2 font-light">
          Passwords do not match
        </h1>
      )}

      <div className="flex justify-start items-center mt-2 ">
        <button
          type="submit"
          disabled={!validPassword}
          className="text-white ml-3 w-full bg-violet-700 hover:bg-violet-600 rounded-lg py-2 px-6 disabled:hover:bg-transparent disabled:text-gray-400 disabled:bg-gray-200 disabled:hover:bg-gray-200  disabled:border-black dark:disabled:text-gray-200 dark:disabled:bg-gray-600 dark:disabled:hover:bg-gray-600"
          onClick={(e) => onClick(e)}
        >
          Sign Up
        </button>
      </div>
    </form>
    </div>
  );
}

export default SignUpForm;