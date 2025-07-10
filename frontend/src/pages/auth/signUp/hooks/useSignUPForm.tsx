import { useState, useEffect } from 'react';
import type { ChangeEvent, FocusEvent } from 'react';

type FormFields = {
  fname: string;
  lname: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type ErrorFields = Partial<Record<keyof FormFields, string>>;
type TouchedFields = Partial<Record<keyof FormFields, boolean>>;

export function useSignUpForm(initialValues: FormFields) {
  const [formData, setFormData] = useState<FormFields>(initialValues);
  const [errors, setErrors] = useState<ErrorFields>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (values: FormFields): ErrorFields => {
    const newErrors: ErrorFields = {};
    if (!values.fname.trim()) newErrors.fname = "First name is required";
    if (!values.lname.trim()) newErrors.lname = "Last name is required";
    if (!values.email.includes("@")) newErrors.email = "Invalid email address";
    if (!values.address.trim()) newErrors.address = "Address is required";
    if (!/^\d{7,}$/.test(values.phone)) newErrors.phone = "Invalid phone number";
    if (values.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (values.confirmPassword !== values.password) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  useEffect(() => {
    const errs = validate(formData);
    setErrors(errs);
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

  return { formData, errors, touched, isFormValid, handleChange, handleBlur };
}
