import { BreadcrumbItem } from "@nextui-org/breadcrumbs";

interface Props{
    index:number
    value:any
}

export const BreadCrumbItem = ({index,value}:Props) => {
    
    
  return <><BreadcrumbItem size="lg">{value}</BreadcrumbItem></>;
};
