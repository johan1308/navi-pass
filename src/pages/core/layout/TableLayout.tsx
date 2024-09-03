import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export type valueType = {
  name: string;
  value: string | { (item: any): JSX.Element | string | number };
};

interface Props {
  columns: valueType[];
  data: any;
  Paginator?: React.ReactNode;
  isLoading: boolean;
}

export const TableLayout = ({ columns, data, Paginator, isLoading }: Props) => {
  const setValueTableCell = (item: any) => {
    return (
      <TableRow key={item.id}>
        {columns.map((resp: valueType, i) => (
          <TableCell
            className="my-4 dark:text-white"
            key={!resp ? i : resp.name}
          >
            {typeof resp.value == "string"
              ? item[resp.value]
              : resp.value(item)}
          </TableCell>
        ))}
      </TableRow>
    );
  };
  return (
    <Table
      radius="none"
      shadow="none"
      removeWrapper={false}
      aria-label="Example static collection table"
      bottomContent={Paginator}
    >
      <TableHeader>
        {columns.map((column: valueType, i) => (
          <TableColumn className="text-md" key={!column ? i : column.name}>
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={data}
        isLoading={isLoading}
        loadingContent={
          <>
            <div className="bg-white dark:bg-primaryDark   dark:opacity-90 opacity-90 h-full w-full flex justify-center items-center">
              {/* <Loading /> */}
            </div>
          </>
        }
        emptyContent={"No hay pagos"}
      >
        {(item: any) => setValueTableCell(item)}
      </TableBody>
    </Table>
  );
};
