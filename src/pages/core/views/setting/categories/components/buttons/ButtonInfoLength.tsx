import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";

import { IoEllipsisHorizontalSharp } from "react-icons/io5";

export const ButtonInfoLength = ({ data }: { data: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {/* <Button isIconOnly onClick={onOpen} color="secondary" size="sm">
        <FaInfo />
      </Button> */}
      <Tooltip content='Ver mas'>
        <button className="ml-3">
          <span
            onClick={onOpen}
            className="inline-flex items-center rounded-full bg-primary/50 hover:bg-primary/40 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10"
          >
            <IoEllipsisHorizontalSharp />
          </span>
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Información
              </ModalHeader>
              <ModalBody>
                <p>{data}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onPress={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
