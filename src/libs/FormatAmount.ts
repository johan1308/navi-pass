import currency from "currency.js";


export const formatDollar=(amount:number)=>{
    
    return currency(amount, { separator: '.', decimal:',' }).format();
}
export const formatBS=(amount:number)=>{
    return currency(amount, { separator: '.',decimal:',', symbol:'Bs. '}).format();}