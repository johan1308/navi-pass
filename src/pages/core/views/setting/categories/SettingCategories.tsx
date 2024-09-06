import { Button } from "@nextui-org/react";
import { TemplateTableLayout } from "../../../layout/TemplateTableLayout";
import { TableSettingCategories } from "./components/table/TableSettingCategories";
import { BiPlus } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";
import { ButtonAddCategories } from "./components/buttons/ButtonAddCategories";

const SettingCategories = () => {
  return (
    <div className="animate-fade">
      <TemplateTableLayout
        title="Categorías"
        bottons={
          <div className="space-x-4 flex items-center">
            <ButtonAddCategories/>
            <Button isIconOnly color="secondary" aria-label="Like">
              <FiRefreshCw className="h-4 w-4" />
            </Button>
          </div>
        }
        search={(e) => console.log(e)}
      >
        <>
          <TableSettingCategories />
        </>
      </TemplateTableLayout>
    </div>
  );
};

export default SettingCategories;
