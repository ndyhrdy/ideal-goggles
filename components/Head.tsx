import Base from "next/head";
import { FC } from "react";

type Props = {
  title?: string;
};

const Head: FC<Props> = ({ children, title }) => {
  return (
    <Base>
      <title>Univerxities{title ? ` | ${title}` : ""}</title>
    </Base>
  );
};

export default Head;
