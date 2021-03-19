import { FC } from "react";

type Props = {
  type?: "default" | "danger" | "success";
};

const Alert: FC<Props> = ({ children, type = "default" }) => {
  const typeClassNames = {
    default: "bg-gray-200 border-gray-400 text-gray-600",
    success: "bg-green-100 border-green-400 text-green-600",
    danger: "bg-red-100 border-red-400 text-red-600",
  };

  return (
    <div className={`border-l-2 px-4 py-2 mb-4 ${typeClassNames[type]}`}>
      {children}
    </div>
  );
};

export default Alert;
