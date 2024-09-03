
import { Button, Input } from "@nextui-org/react";
import {  useState } from "react";
import { ButtonAddFieldPass } from "./ButtonAddFieldPass";

export interface dataInput {
  title: string;
  id:string;
  value:string
}

export const FormAddPass = () => {
  const [inputList, setInputList] = useState<dataInput[]>([]);
  const [list, setList] = useState<any>({});


  const onSubmit = (data: any) => {
    console.log(inputList);
    
  };


  const handleInput=(data:dataInput)=>{
    
    setInputList(d=>[...d,data])
  }

  const handleChange=({target:{id,value,name}}:any)=>{
    
    console.log(id);
    console.log(value);
    console.log(name);
    
  }

  return (
    <div className="mt-4">
      <form className="space-y-5" >
        {/* Agregar Campo */}
        <Input
          type="text"
          label="Usuario"
          placeholder="Introduce tu usuario"
          variant="bordered"
          color="secondary"
        />
        <Input
          type="text"
          label="Contraseñas"
          placeholder="*********"
          variant="bordered"
          color="secondary"
        />
        {inputList.map((d) => (
          <Input
            type="text"
            key={d.id}
            label={d.title}
            placeholder={`Introduce ${d.title}`}
            variant="bordered"
            color="secondary"
            id={d.id}
            name={d.title}
            onChange={handleChange}
          />
        ))}
        <button></button>
        <ButtonAddFieldPass send={handleInput}/>

        <Button
          color="primary"
          type="button"
          onClick={onSubmit}
          className="w-full mt-5 rounded-xl"
        >
          Guardar
        </Button>
      </form>
    </div>
  );
};
