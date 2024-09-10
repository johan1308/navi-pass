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
import { useThemeMovilPay } from "../../../../../../../hooks/useTheme";
import { classNames } from "../../../../../../../helpers/ClassN";
import { useMutation } from "react-query";
import { deleteCategoriesSetting } from "../../../apis/categoriesSettingApi";
import {
  ErrorToast,
  SuccessToast,
} from "../../../../../../../libs/Notifications";
import { queryClient } from "../../../../../../../App";

export const ButtonDeleteCategories = ({ id }: { id: number }) => {
  const { darkMode } = useThemeMovilPay();
  const { isOpen, onOpenChange } = useDisclosure();
  const mutation = useMutation(deleteCategoriesSetting);

  const handleSuccess = () => {
    mutation.mutateAsync(id, {
      onSuccess: ({ data }: any, variables, context) => {
        const { message } = data;
        SuccessToast(message);
        onOpenChange();
        queryClient.invalidateQueries("categories");
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
      <Button color="primary" isIconOnly size="sm" onClick={onOpenChange}>
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
                <Button color="secondary" onPress={handleSuccess}>
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
