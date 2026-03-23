export const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;

//For login
export const validateEmail = (email: string): string | null => {
  if (!email?.trim()) {
    return 'Email required'
  }
  if (!emailRegex.test(email)) {
    return 'Enter a correct email'
  }
  return null;
}

export const validatePasswordForLogin = (password: string): string | null => {
  if (!password) {
    return 'Password required'
  }
  return null
}

//For sign up
export const validateNameForSignup = (name: string): string | null => {
  if (!name?.trim()) {
    return 'Name required'
  }
  if (name.trim().length < 2) {
    return 'The name must be at least 2 characters long'
  }
  if (name.trim().length > 40) {
    return 'The name must not exceed 40 characters'
  }
  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name.trim())) {
    return 'The name can only contain letters, spaces and hyphens'
  }
  return null;
}

export const validatePasswordForSignup = (password: string): string | null => {
  if (!password) {
    return 'Password required'
  }
  if (password.length < 8) {
    return 'The password must be at least 6 characters long.'
  }
  if (!/[A-Za-z]/.test(password)) {
    return 'The password must contain at least one letter'
  }
  if (!/\d/.test(password)) {
    return 'The password must contain at least one number.'
  }
  return null;
}