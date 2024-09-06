import { Button, Input, Textarea } from "@nextui-org/react";

export const FormUpdatePrincipal = () => {
  return (
    <form className=" bg-white dark:bg-primaryDark rounded-xl shadow-xl p-5 ">
      <div className="mb-3">
        <h2 className="text-base font-semibold leading-7 dark:dark:text-white">
          Información Principal
        </h2>
      </div>
      <div className="space-y-8">
        <div className="col-span-full">
          <Input
            label="Usuario"
            placeholder="Introduce un usuario"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
          />
        </div>
        <div className="col-span-full">
          <Input
            label="Contraseña"
            placeholder="Introduce la contraseña"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
          />
        </div>
        <div className="col-span-full">
          <Textarea
            label="Descripción"
            placeholder="Introduce la descripción"
            variant="bordered"
            color="secondary"
            className="dark:text-textDark"
          ></Textarea>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" color="secondary">
          Actualizar
        </Button>
      </div>
    </form>
  );
};
