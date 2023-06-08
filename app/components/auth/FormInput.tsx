import React, { FC } from 'react';

interface Props {
  label: string;
  type: string;
  placeholder: string;
  onChange?: any;
  icon?: any;
  error?: boolean;
}

const FormInput: FC<Props> = ({
  label, placeholder, type, onChange, error, icon,
}) => (
  <div className={!error ? 'p-2 text-red-600' : 'p-2'}>
    <label
      htmlFor=""
      className={
          icon
            ? 'flex justify-between text-sm w-full items-center gap-2'
            : 'text-sm dark:text-white'
        }
    >
      {label}

      {icon}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      required
      onChange={onChange}
      className={
          !error
            ? 'w-full my-1 border transition-all border-red-700 p-2 placeholder:text-sm focus:outline-none focus:ring-1 focus:ring-red-700 dark:empty:dark:bg-[#190a37] rounded-lg'
            : 'w-full my-1 border transition-all border-violet-700 p-2 placeholder:text-sm  font-light  focus:outline-none focus:ring-1 dark:bg-[#190a37] rounded-lg dark:text-white'
        }
    />
  </div>
);

export default FormInput;