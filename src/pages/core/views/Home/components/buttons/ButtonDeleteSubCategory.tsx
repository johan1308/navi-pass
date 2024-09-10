import { BiTrash } from "react-icons/bi";
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
import { useMutation } from "react-query";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { ErrorToast, SuccessToast } from "../../../../../../libs/Notifications";
import { queryClient } from "../../../../../../App";
import { classNames } from "../../../../../../helpers/ClassN";
import { deleteSubCategoriesSetting } from "../../../setting/apis/categoriesSettingApi";

export const ButtonDeleteSubCategory = ({sub_category_id}:{sub_category_id:number}) => {
  const { darkMode } = useThemeMovilPay();
  const { isOpen, onOpenChange,onOpen } = useDisclosure();
  const mutation = useMutation(deleteSubCategoriesSetting);

  const handleSuccess = () => {
    mutation.mutateAsync(sub_category_id, {
      onSuccess: ({ data }: any, variables, context) => {
        const { message } = data;
        SuccessToast(message);
        onOpenChange();
        queryClient.invalidateQueries("sub_categories");
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
      <Tooltip content="Eliminar sub-categoría">
        <button
          onClick={onOpen}
          className="group hover:text-primary text-danger"
        >
          <BiTrash className="h-5 w-5" />
        </button>
      </Tooltip>
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
