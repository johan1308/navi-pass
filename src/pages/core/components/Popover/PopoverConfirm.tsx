import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import React from "react";
import { FaInfo } from "react-icons/fa";

interface Props {
  item: any;
  message: string;
  children?: React.ReactNode;
  titleButton?: string;
  title: string;
  confirm: (e?: any) => void;
  cancel?: (e?: any) => void;
}

export const PopoverConfirm = ({
  children,
  item,
  message,
  title,
  titleButton,
  cancel,
  confirm,
}: Props) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Popover
      placement="bottom"
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <PopoverTrigger>
        {children ? children : <Button color="primary">{titleButton}</Button>}
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-2 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaInfo
                  className="h-6 w-6 text-orange-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <p className="text-lg font-bold">{title}</p>
                <div className="mt-2">
                  <p className="text-md text-gray-500">{message}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 flex justify-end space-x-5 sm:px-6">
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              variant="ghost"
              color="danger"
              className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  sm:mt-0 sm:w-auto"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              onClick={() => confirm(item)}
              className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  sm:mt-0 sm:w-auto"
            >
              Confirmar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
