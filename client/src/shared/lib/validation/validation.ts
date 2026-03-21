export const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;

export const validateEmail = (email: string): string | null => {
  if (!email?.trim()) {
    return 'Email required';
  }
  if (!emailRegex.test(email)) {
    return 'Enter a correct email';
  }
  return null;
};

//For login
export const validatePasswordForLogin = (password: string): string | null => {
  if (!password) {
    return 'Password required';
  }
  return null;
};

//For sign up
export const validatePasswordForSignup = (password: string): string | null => {
  if (!password) {
    return 'Password required';
  }
  if (password.length < 8) {
    return 'The password must be at least 6 characters long.';
  }
  if (!/[A-Za-z]/.test(password)) {
    return 'The password must contain at least one letter';
  }
  if (!/\d/.test(password)) {
    return 'The password must contain at least one number.';
  }
  return null;
};