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
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../../../App";
import { useMutation } from "react-query";
import { postAdditionalInformation } from "../../../Home/api/HomeAPi";
import { ErrorToast, SuccessToast } from "../../../../../../libs/Notifications";
import { useThemeMovilPay } from "../../../../../../hooks/useTheme";
import { classNames } from "../../../../../../helpers/ClassN";


interface Props {
  send: (e: dataInput) => void;
}

const schema = yup
  .object({
    title: yup.string().required("* Debes introducir el titulo *"),
    values: yup.string().required("* Debes introducir el valor *"),
  })
  .required();

export const ButtonAddPassUpd = ({ send }: Props) => {
  const { darkMode } = useThemeMovilPay();
  const { id } = useParams();
  const { isOpen, onOpen, onOpenChange, onClose: closeModal } = useDisclosure();
  const mutation = useMutation(postAdditionalInformation);
  const {
    register,
    formState: { errors, isValid },
    reset,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    const body = {
      ...data,
      credential_id: id,
    };

    mutation.mutate(body, {
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
    });
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
                      {errors.title?.message}
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
