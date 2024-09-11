import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { BiTrash } from "react-icons/bi";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { useMutation } from "react-query";
import { AdditionalInformation } from "../../../Home/interfaces/CredentialsInterfaces";
import { ErrorToast, SuccessToast } from "../../../../../../libs/Notifications";
import { queryClient } from "../../../../../../App";
import { classNames } from "../../../../../../helpers/ClassN";
import { deleteAdditionalInformation } from "../../../Home/api/HomeAPi";

interface Props {
  additionalInformation: AdditionalInformation;
}

export const ButtonDeletePassUpd = ({ additionalInformation }: Props) => {
  const { darkMode } = useThemeMovilPay();
  const { isOpen, onOpenChange } = useDisclosure();
  const mutation = useMutation(deleteAdditionalInformation);

  const handleSuccess = () => {
    const id = Number(additionalInformation.id);
    mutation.mutateAsync(id, {
      onSuccess: ({ data }: any, variables, context) => {
        const { message } = data;
        SuccessToast(message);
        onOpenChange();
        queryClient.invalidateQueries("credential");
      },
      onError: (data: any, variables, context) => {
        if (data.status == 400) {
          ErrorToast(data.data.message);
        }
      },
    });
  };
  return (
    <>
      <Button
        isIconOnly
        className="rounded-xl text-danger"
        onClick={onOpenChange}
      >
        <BiTrash className="h-5 w-5" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className={classNames(darkMode && "bg-primaryDark")}>
          {(onClose) => (
            <>
              <ModalHeader
                className={classNames(
                  darkMode && "text-titleDark",
                  "flex flex-col gap-1"
                )}
              >
                <span>Estas seguro?</span>
              </ModalHeader>
              <ModalBody className={classNames(darkMode && "text-textDark")}>
                Estas seguro que deseas eliminar?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  color="secondary"
                  onPress={handleSuccess}
                  isLoading={mutation.isLoading}
                >
                  Aceptar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
