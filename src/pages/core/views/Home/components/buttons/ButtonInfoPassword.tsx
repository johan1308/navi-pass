import { Button, Tooltip } from "@nextui-org/react";
import { FaInfo } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
  id: number;
}

export const ButtonInfoPassword = ({ id }: Props) => {
  const navigation = useNavigate();

  const handleNavigate = () => {
    const url = `${id}/update/`;
    navigation(url);
  };
  return (
    <>
      <Tooltip content="Ver información">
        <Button
          isIconOnly
          size="sm"
          onClick={handleNavigate}
          className="dark:bg-transparent "
        >
          <FaInfo className="text-primary dark:text-white h-4 w-4  rounded-full " />
        </Button>
      </Tooltip>
    </>
  );
};
