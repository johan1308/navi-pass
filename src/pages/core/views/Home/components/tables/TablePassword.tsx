import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { ButtonInfoPassword } from "../buttons/ButtonInfoPassword";

export const TablePassword = () => {
  return (
    <div className="animate-fade">
      <Table aria-label="Example static collection table" removeWrapper>
        <TableHeader className="bg-primary">
          <TableColumn>USUARIO</TableColumn>
          <TableColumn>CONTRASEÑA</TableColumn>
          <TableColumn>ACCIÓN</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1" className="dark:text-white">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>CEO</TableCell>
            
            <TableCell>
              <ButtonInfoPassword id={1} />
            </TableCell>
          </TableRow>
          <TableRow key="2" className="dark:text-white">
            <TableCell>Zoey Lang</TableCell>
            <TableCell>Technical Lead</TableCell>
            <TableCell>
              <ButtonInfoPassword id={2} />
            </TableCell>
          </TableRow>
          <TableRow key="3" className="dark:text-white">
            <TableCell>Jane Fisher</TableCell>
            <TableCell>Senior Developer</TableCell>
            <TableCell>
              <ButtonInfoPassword id={3} />
            </TableCell>
          </TableRow>
          <TableRow key="4" className="dark:text-white">
            <TableCell>William Howard</TableCell>
            <TableCell>Community Manager</TableCell>
            <TableCell>
              <ButtonInfoPassword id={3} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
