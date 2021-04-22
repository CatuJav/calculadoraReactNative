import { useRef, useState } from "react";

enum Operadores{
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {
    
    const [numero, setNumero ] = useState('100');
    const [numeroAnterior, setNumeroAnterior] = useState('0');

    const ultimaOperacion = useRef<Operadores>();

    const limpiar=()=>{
        setNumero('0');
        setNumeroAnterior('0');
    };
    const positivoNegativo=()=>{
        //console.log(numeroAnterior)
        numero.includes('-')?setNumero(numero.replace('-','')):setNumero('-'+numero);
    }
    const btnDelete=()=>{
        if (numero.length==1||(numero.length==2 && numero.includes('-'))) {
            setNumero('0');
        }else{
            //setNumero(numero.substr(0,numero.length-1));
            setNumero(numero.slice(0,-1));
        }
    }

    const armarNumero=(numeroTexto:string)=>{
        //N aceptar doble punto
        if(numero.includes('.')&&numeroTexto==='.') return;
        if(numero.startsWith('0')||numero.startsWith('-0')){
            //Punto decimal
            if(numeroTexto==='.'){
                setNumero(numero+numeroTexto)

                //Evaluar si es otro cero y hay puntp

            }else if (numeroTexto==='0'&&numero.includes('.')) {
                setNumero(numero+numeroTexto);
            
                //Evaular si es diferente de cero y no tine un punto
            }else if(numeroTexto!='0'&&!numero.includes('.')){
                setNumero(numeroTexto);

                //Evitar 000.0
            }else if(numeroTexto==='0'&& !numero.includes('.')){
                setNumero(numero);
            }else{
                setNumero(numero+numeroTexto);
            }
        }else{
        setNumero(numero+numeroTexto);
        }
    };

    const cambiarNumerPorAnterior=()=>{

        if (numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0,-1));
        }else{
        setNumeroAnterior(numero);
        }

        setNumero('0');
    }

    const btnDividir=()=>{
        cambiarNumerPorAnterior();
        ultimaOperacion.current=Operadores.dividir;
    }
    const btnMultiplicar=()=>{
        cambiarNumerPorAnterior();
        ultimaOperacion.current=Operadores.multiplicar;
    }
    const btnRestar=()=>{
        cambiarNumerPorAnterior();
        ultimaOperacion.current=Operadores.restar;
    }
    const btnSumar=()=>{
        cambiarNumerPorAnterior();
        ultimaOperacion.current=Operadores.sumar;
    }

    const calcular=()=>{
        const num1= Number(numero);
        const num2= Number(numeroAnterior);
        if( num1 && !num2){
            return setNumero(`${num1}`)
        }
        switch (ultimaOperacion.current) {
            case Operadores.sumar:
                setNumero(`${num1+num2}`);
               
                break;
            case Operadores.restar:
                setNumero(`${num2-num1}`);
               
                break;
            case Operadores.multiplicar:
                setNumero(`${num1*num2}`);
               
                break;
            case Operadores.dividir:
                setNumero(`${num2/num1}`);
               
                break;

        }
        setNumeroAnterior('0');
    }
    
    return (
     {
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo,
        btnDelete,
        btnDividir,
        armarNumero,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
     }

    )
}
