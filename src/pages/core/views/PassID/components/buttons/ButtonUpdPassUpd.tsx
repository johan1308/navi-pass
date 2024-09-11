import { BiPencil } from "react-icons/bi";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { queryClient } from "../../../../../../App";
import { useMutation } from "react-query";
import { patchAdditionalInformation } from "../../../Home/api/HomeAPi";
import { ErrorToast, SuccessToast } from "../../../../../../libs/Notifications";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { classNames } from "../../../../../../helpers/ClassN";
import { AdditionalInformation } from "../../../Home/interfaces/CredentialsInterfaces";
import { useEffect } from "react";

interface Props {
  additionalInformation: AdditionalInformation;
}

const schema = yup
  .object({
    title: yup.string().required("* Debes introducir el titulo *"),
    values: yup.string().required("* Debes introducir el valor *"),
  })
  .required();
export const ButtonUpdPassUpd = ({ additionalInformation }: Props) => {
  const { darkMode } = useThemeMovilPay();
  const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure();
  const mutation = useMutation(({ id, body }: any) =>
    patchAdditionalInformation(id, body)
  );
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (body: any) => {
    mutation.mutate(
      {
        id: additionalInformation.id,
        body,
      },
      {
        onSuccess: ({ data }) => {
          SuccessToast(data.message);
          queryClient.invalidateQueries("credential");
          reset();
          closeModal();
        },
        onError: ({ response }: any, variables, context) => {
          // An error happened!
          ErrorToast(response.data.message);
        },
      }
    );
  };

  useEffect(() => {
    setValue("title", additionalInformation.title);
    setValue("values", additionalInformation.values);
  }, [additionalInformation]);

  return (
    <div>
      <Tooltip content="Agregar Información">
        <Button isIconOnly className="rounded-xl text-warning" onClick={onOpen}>
          <BiPencil className="h-5 w-5" />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          reset();
        }}
      >
        <ModalContent className={classNames(darkMode && "bg-primaryDark")}>
          {(onClose) => (
            <>
              <ModalHeader
                className={classNames(
                  darkMode && "text-white",
                  "flex flex-col gap-1"
                )}
              >
                Agregar nueva información
              </ModalHeader>
              <ModalBody>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Input
                      type="text"
                      label="Titulo"
                      color="secondary"
                      variant="bordered"
                      className={classNames(darkMode && "text-white")}
                      placeholder="Introduce el titulo"
                      {...register("title")}
                    />
                    <p className="text-xs text-danger">
                      {errors.title?.message}
                    </p>
                  </div>
                  <div>
                    <Textarea
                      label="Valor"
                      placeholder="Introduce el valor..."
                      variant="bordered"
                      color="secondary"
                      className={classNames(darkMode && "text-white")}
                      {...register("values")}
                    />
                    <p className="text-xs text-danger">
                      {errors.values?.message}
                    </p>
                  </div>
                  <div className="flex justify-end my-3 space-x-3">
                    <Button color="danger" variant="ghost" onPress={onClose}>
                      Cerrar
                    </Button>
                    <Button
                      color="secondary"
                      type="submit"
                      isLoading={mutation.isLoading}
                    >
                      Agregar
                    </Button>
                  </div>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
