import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export const TableSettingCategories = () => {
  return (
    <>
      <Table aria-label="Example static collection table" removeWrapper>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>NOMBRE</TableColumn>
          <TableColumn>ACCIÓN</TableColumn>
        </TableHeader>
        <TableBody >
          <TableRow key="1" className="dark:text-textDark">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="2" className="dark:text-textDark">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>Paused</TableCell>
          </TableRow>
          <TableRow key="3" className="dark:text-textDark">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow key="4" className="dark:text-textDark">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>Vacation</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
