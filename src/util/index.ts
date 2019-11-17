import { validate } from "isemail";

// Check if the submitted email address is valid.
export const validateEmail = (email: string) =>
  validate(email, { minDomainAtoms: 2 });

// Check if the password length consist of at least 5 characters
export const validPassword = (password: string) => password.length >= 5;
