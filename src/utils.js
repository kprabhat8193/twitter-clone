export const getHandle = (email) => {
  if (email) {
    const atIndex = email.indexOf("@");
    return email.substr(0, atIndex);
  }
};
