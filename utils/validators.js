// signUp validator;
export const validatorSignUp = ({ name, email, password, confirmPassword }) => {
  // check if any field is missing
  if (!name || !email || !password || !confirmPassword) {
    throw new Error("Field Should not be Empty");
  }

  // check is password not matched.
  if (password !== confirmPassword) {
    throw new Error("Passwords not matched");
  }
};

// signin validator
export const validatorLogin = ({ email, password }) => {
  // check if any field is missing
  if (!email || !password) {
    throw new Error("Fields should not be Empty");
  }
};
