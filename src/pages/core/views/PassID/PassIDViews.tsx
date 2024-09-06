import { Button } from "@nextui-org/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FormUpdatePrincipal } from "./components/forms/FormUpdatePrincipal";
import { FormUpdAditional } from "./components/forms/FormUpdAditional";

export const PassIDViews = () => {
  const navigation = useNavigate();

  const handleNavigate = () => {
    navigation("password");
  };
  return (
    <>
      <Button
        color="primary"
        className="ml-6"
        startContent={<FaArrowLeft />}
        onClick={handleNavigate}
      >
      Atrás
      </Button>
      <div className="grid  grid-cols-3  gap-4 pt-10">
        <FormUpdatePrincipal />
        <FormUpdAditional />
      </div>
    </>
  );
};
