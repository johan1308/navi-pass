interface keyFilterNumberInterface {
  value: any;
  onChange: (e: any) => any;
}

export const keyFilterNumber = ({
  value,
  onChange,
}: keyFilterNumberInterface) => {
    const totalLength = value.target.value;
    const numberUnit = value.nativeEvent.data;
  
    // Permitir la eliminación de caracteres
    if (numberUnit === null) {
      onChange(totalLength);
      return true;
    }
  
    // Verificar si el carácter ingresado es un número
    if (!/^\d$/.test(numberUnit)) {
      return false;
    }

  
    onChange(totalLength);
    return true;
};
