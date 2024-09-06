import { BiPlus } from "react-icons/bi";
import * as yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { dataInput } from "../../../Home/components/FormAddPass";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getID } from "../../../../../../libs/GetIDLibs";

interface Props {
  send: (e: dataInput) => void;
}

const schema = yup
  .object({
    title: yup.string().required("Debes introducir el titulo"),
    value: yup.string().required("Debes introducir el titulo"),
  })
  .required();

export const ButtonAddPassUpd = ({ send }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure();
  const {
    control,
    formState: { errors, isValid },
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const id = getID();
    send({
      ...data,
      id,
    });
    closeModal();
  };

  return (
    <div>
      <Tooltip content="Agregar Información">
        <button
          type="button"
          onClick={onOpen}
          className="bg-transparent font-medium border-secondary dark:border-titleDark border-2 border-dashed p-2 rounded-full"
        >
          <BiPlus className="h-4 w-4 text-secondary dark:text-titleDark" />
        </button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <form className="space-y-5">
                  <Input
                    type="text"
                    label="Titulo"
                    color="secondary"
                    variant="bordered"
                    placeholder="Introduce el titulo"
                  />
                  <Textarea
                    label="Valor"
                    placeholder="Introduce el valor..."
                    variant="bordered"
                    color="secondary"
                    className=""
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Cerrar
                </Button>
                <Button color="secondary" onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
