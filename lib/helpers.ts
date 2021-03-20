export const validateRequired = (value: any): boolean => {
  return !!value && typeof value === "string" && !!value.trim().length;
};

export const validateEmail = (value: string): boolean => {
  return !!value.match(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ).length;
};
