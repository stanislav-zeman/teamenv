import {FC} from "react";
import GenericCard from "../common/GenericCard";

export const VariableColumns: FC<{}> = () => {
  return (
    <GenericCard columns="7% 15% 30% 25% 20%">
      <div>EXPORT</div>
      <div className="w-[65%] text-center">ENVIRONMENT</div>
      <div className="w-[60%] text-center">NAME</div>
      <div className="w-[85%] text-center">VALUE</div>
    </GenericCard>
  );
};
