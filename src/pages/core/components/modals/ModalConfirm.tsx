import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const message = "Estas seguro que deseas eliminar?";

interface Props {
  children: React.ReactNode | JSX.Element;
  onSuccess: (data: any) => any;
  data?: any;
}

export const ButtonModalConfirm = ({ children, data, onSuccess }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const handleSuccess = () => {
    onOpenChange();
    onSuccess(true);
  };

  return (
    <>
      {children}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Estas seguro?
              </ModalHeader>
              <ModalBody>{data ?? message}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
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
