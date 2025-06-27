import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface inpPassProps {
  id: string;
  placeholder?: string;
  children?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string; // 👈 allow passing custom class
  inputClassName?: string; // 👈 optional custom class for input field
}

const InputPassword: React.FC<inpPassProps> = ({
  id,
  placeholder,
  children,
  value,
  onChange,
  onBlur,
  onFocus,
  className = '',
  inputClassName = ''
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className='w-35 block' htmlFor={id}>
        {children}
      </label>
      <div className='border w-54 justify-between flex'>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          id={id}
          className={`bg-white px-2 py-1 w-45 outline-none ${inputClassName}`}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
        />
        <button
          type='button'
          className='p-1 cursor-pointer'
          onClick={toggleVisibility}
        >
          {isPasswordVisible ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
};

export default InputPassword;
