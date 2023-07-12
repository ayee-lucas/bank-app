import React, { ChangeEventHandler } from "react";

interface Props {
    name: string;
    type: string;
    placeholder: string;
    defaultValue?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

const Form: React.FC<Props> = ({name, type, placeholder,defaultValue, onChange}) => {
  return (
    <div>
      <label className="text-gray-700 dark:text-gray-300">
        {name}
      </label>
      <input
        className="bg-gray-100 border form-input w-full px-2 py-1 appearance-none rounded-md focus:border-indigo-600 text-black"
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

export default Form;
