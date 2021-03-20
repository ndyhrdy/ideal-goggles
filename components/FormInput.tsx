import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";

type Props = {
  onChangeText?: (text: string) => void;
};

const FormInput: FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    Props
> = ({ onChangeText, onChange, ...props }) => {
  return (
    <input
      className="border rounded-md px-2 h-10 dark:border-gray-700 focus:border-primary-500 dark:focus:border-primary-500 bg-white dark:bg-gray-800 dark:text-white"
      onChange={(e) => {
        onChangeText?.(e.target.value);
        onChange?.(e);
      }}
      {...props}
    />
  );
};

export default FormInput;
