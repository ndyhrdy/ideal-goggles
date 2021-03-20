import { FC } from "react";

type Props = {
  label: string;
};

const FormField: FC<Props> = ({ label, children }) => {
  return (
    <div className="mb-4 px-8 flex flex-col">
      <label className="text-gray-400 dark:text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  );
};

export default FormField;
