import { HiPlusSm } from "react-icons/hi";
import { useThemeMovilPay } from "../../../../../../../hooks/useTheme";
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
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BiPlus } from "react-icons/bi";
import { classNames } from "../../../../../../../helpers/ClassN";

const schema = yup
  .object({
    name: yup.string().required("* El nombre es obligatorio *"),
  })
  .required();

export const ButtonAddCategories = () => {
  const { darkMode } = useThemeMovilPay();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { name: string }) => console.log(data);

  return (
    <>
      <Button
        color="primary"
        endContent={<HiPlusSm className="h-5 w-5" />}
        onClick={onOpen}
      >
        Crear
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={classNames(darkMode ? "bg-primaryDark" : "bg-white")}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader
                className={classNames(
                  darkMode ? "text-white" : "text-primaryDark",
                  "flex flex-col gap-1"
                )}
              >
                Crear categoría
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    variant="bordered"
                    {...register("name")}
                    label="Nombre"
                    className={classNames(darkMode&&"text-textDark ")}
                    placeholder="Introduce el nombre para la categoría"
                  />
                  <p className="text-xs text-red-500">{errors.name?.message}</p>
                  <div className="flex justify-end mt-5 space-x-5">
                    <Button color="primary" variant="ghost" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="secondary"
                      type="submit"
                      endContent={<BiPlus className="h-5 w-5" />}
                    >
                      Registrar
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
