import React, { useState } from 'react';
import InputPassword from '../../../core/components/atoms/fragments/InputPassword';
import InputText from '../../../core/components/atoms/fragments/InputText';
import { signUp } from '../../../Api/auth/signup';
import { useSignUpForm } from './hooks/useSignUPForm'; // Adjust path as needed
import FileInput from './components/FIleInput'; // Adjust path as needed

const SignUp: React.FC = () => {
  const inptextStyles = {
    div: "flex flex-col gap-1",
    input: "border px-2 p-1 w-full",
  };

  const { formData, errors, touched, isFormValid, handleChange, handleBlur } = useSignUpForm({
    fname: "",
    lname: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  const renderError = (field: keyof typeof formData) =>
    touched[field] && errors[field] ? (
      <span className="text-red-500 text-sm">{errors[field]}</span>
    ) : null;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      await signUp({
        ...formData,
        image: imageFile || null,
      });
      alert('Registration successful');
      // reset form or redirect here
    } catch (error) {
      alert('Registration failed');
      console.error(error);
    }
  };

  return (
    <div className="h-fit">
      <h2 className="font-bold text-xl text-gray-700 text-center p-2">Create New Account</h2>
      <form
        className="h-fit"
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-full">
              <InputText id="fname" value={formData.fname} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                First Name
              </InputText>
              {renderError("fname")}
            </div>
            <div className="w-full">
              <InputText id="lname" value={formData.lname} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                Last Name
              </InputText>
              {renderError("lname")}
            </div>
          </div>

          <div>
            <InputText id="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
              Email
            </InputText>
            {renderError("email")}
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <InputText id="address" value={formData.address} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                Address
              </InputText>
              {renderError("address")}
            </div>
            <div className="w-full">
              <InputText id="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                Phone
              </InputText>
              {renderError("phone")}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-full">
              <InputPassword id="password" value={formData.password} onChange={handleChange} onBlur={handleBlur}>
                Password
              </InputPassword>
              {renderError("password")}
            </div>
            <div className="w-full">
              <InputPassword id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} onBlur={handleBlur}>
                Confirm Password
              </InputPassword>
              {renderError("confirmPassword")}
            </div>
          </div>

          <FileInput label="Profile Image" onFileSelect={setImageFile} />

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-2 font-bold rounded-lg text-white ${isFormValid ? "bg-green-600 hover:bg-green-500" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Sign Up
          </button>

          <span className="text-center">
            Already have an Account? <a className="text-blue-600" href="/login">Login</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
