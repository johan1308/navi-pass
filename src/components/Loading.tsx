import { Spinner } from "@nextui-org/react";
import "./css/LoadingStyle.css";

export const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );
};
