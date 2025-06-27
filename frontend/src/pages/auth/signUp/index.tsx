import React, { useState, useEffect, } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';
import InputPassword from '../../../core/components/atoms/fragments/InputPassword';
import InputText from '../../../core/components/atoms/fragments/InputText';

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ErrorFields = Partial<Record<keyof FormFields, string>>;
type TouchedFields = Partial<Record<keyof FormFields, boolean>>;

const SignUp: React.FC = () => {
  const inptextStyles = {
    div: "flex flex-col gap-1",
    input: "border px-2 p-1 w-full",
  };

  const [formData, setFormData] = useState<FormFields>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorFields>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (values: FormFields): ErrorFields => {
    const newErrors: ErrorFields = {};
    if (!values.firstName.trim()) newErrors.firstName = "First name is required";
    if (!values.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!values.email.includes("@")) newErrors.email = "Invalid email address";
    if (!values.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{7,}$/.test(values.phone)) newErrors.phone = "Invalid phone number";
    if (values.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (values.confirmPassword !== values.password) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  useEffect(() => {
    const errs = validate(formData);
    setIsFormValid(Object.keys(errs).length === 0);
  }, [formData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { id } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    const errs = validate(formData);
    setErrors(errs);
  };

  const renderError = (field: keyof FormFields) =>
    touched[field] && errors[field] ? (
      <span className="text-red-500 text-sm">{errors[field]}</span>
    ) : null;

  return (
    <div className="h-fit">
      <h2 className="font-bold text-xl text-gray-700 text-center p-2">Create New Account</h2>
      <form className="h-fit" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="w-full">
              <InputText id="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                First Name
              </InputText>
              {renderError("firstName")}
            </div>
            <div className="w-full">
              <InputText id="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} styles={inptextStyles}>
                Last Name
              </InputText>
              {renderError("lastName")}
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

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full p-2 font-bold rounded-lg text-white ${isFormValid ? "bg-green-600 hover:bg-green-500" : "bg-gray-400 cursor-not-allowed"
              }`}
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
