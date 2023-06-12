import { FC, ReactNode } from "react";

interface GenericListProps {
  children: ReactNode[];
}

const GenericList: FC<GenericListProps> = ({ children }) => {
  return (
    <main className="flex flex-row flex-wrap gap-7 pt-3 justify-center align-middle">
      {children}
    </main>
  );
};

export default GenericList;
