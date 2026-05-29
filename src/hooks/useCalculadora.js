import { useState, useRef } from 'react'

// Maximo de caracteres permitidos en pantalla
const LIMITE = 9

// Digitos asociados a cada boton numerico
const digitos = {
  btnUno: '1', btnDos: '2', btnTres: '3', btnCuatro: '4', btnCinco: '5',
  btnSeis: '6', btnSiete: '7', btnOcho: '8', btnNueve: '9', btnCero: '0',
}

// Valor maximo permitido en el resultado
const MAX = 999999999

// Muestra ERROR si el resultado es invalido, negativo o muy grande
function formatear(valor) {
  if (Number.isNaN(valor) || valor < 0 || valor > MAX) return 'ERROR'
  return String(valor).slice(0, 9)
}

// Estado y logica de la calculadora
export function useCalculadora() {
  // Valores de la operacion
  const dato1 = useRef(0)
  const dato2 = useRef(0)
  const result = useRef(0)
  const ac = useRef(0)
  const op = useRef(0)
  const b = useRef(1)

  // Texto mostrado en pantalla
  const [pantalla, setPantalla] = useState('')
  // Controla si el punto decimal esta disponible
  const [puntoDisabled, setPuntoDisabled] = useState(false)

  const handleButtonAction = (id) => {
    // Botones del 0 al 9
    if (digitos[id] !== undefined) {
      if (pantalla.length < LIMITE) setPantalla(pantalla + digitos[id])
    }
    // Punto decimal, se deshabilita tras usarlo
    else if (id === 'btnPunto') {
      if (pantalla.length < LIMITE) {
        setPantalla(pantalla.length === 0 ? '0.' : pantalla + '.')
        setPuntoDisabled(true)
      }
    }
    // Suma
    else if (id === 'btnMas') {
      dato1.current = parseFloat(pantalla)
      result.current = dato1.current + result.current
      setPantalla('')
      op.current = 1
      setPuntoDisabled(false)
    }
    // Resta sucesiva, acumula los sustraendos en ac
    else if (id === 'btnMenos') {
      dato1.current = parseFloat(pantalla)
      if (b.current === 1) result.current = dato1.current
      else if (b.current === 0) ac.current = dato1.current + ac.current
      setPantalla('')
      op.current = 2
      setPuntoDisabled(false)
      b.current = 0
    }
    // Multiplicacion
    else if (id === 'btnPor') {
      dato1.current = parseFloat(pantalla)
      setPantalla('')
      op.current = 3
      setPuntoDisabled(false)
    }
    // Division
    else if (id === 'btnDivi') {
      dato1.current = parseFloat(pantalla)
      setPantalla('')
      op.current = 4
      setPuntoDisabled(false)
    }
    // Igual, resuelve segun la operacion pendiente
    else if (id === 'btnIgual') {
      dato2.current = parseFloat(pantalla)
      setPuntoDisabled(true)
      switch (op.current) {
        case 1:
          result.current = result.current + dato2.current
          break
        case 2:
          result.current = result.current - (dato2.current + ac.current)
          break
        case 3:
          result.current = dato1.current * dato2.current
          break
        case 4:
          result.current = dato1.current / dato2.current
          break
      }
      setPantalla(formatear(result.current))
      dato1.current = 0
      result.current = 0
      ac.current = 0
      b.current = 1
    }
    // CE, limpia solo la pantalla
    else if (id === 'btnCE') {
      setPuntoDisabled(false)
      setPantalla('')
    }
    // C, limpia pantalla y reinicia los datos
    else if (id === 'btnC') {
      setPantalla('')
      setPuntoDisabled(false)
      dato1.current = 0
      dato2.current = 0
      result.current = 0
    }
    // Cambio de signo
    else if (id === 'btnMasMenos') {
      setPuntoDisabled(false)
      dato1.current = parseFloat(pantalla)
      result.current = dato1.current * -1
      setPantalla(formatear(result.current))
    }
    // Numero al cuadrado
    else if (id === 'btnCuadrado') {
      setPuntoDisabled(false)
      dato1.current = parseFloat(pantalla)
      result.current = dato1.current * dato1.current
      setPantalla(formatear(result.current))
    }
    // Raiz cuadrada
    else if (id === 'btnRaiz') {
      setPuntoDisabled(false)
      dato1.current = parseFloat(pantalla)
      result.current = Math.sqrt(dato1.current)
      setPantalla(formatear(result.current))
    }
    // Inverso 1/x
    else if (id === 'btnUnoX') {
      setPuntoDisabled(false)
      dato1.current = parseFloat(pantalla)
      result.current = 1 / dato1.current
      setPantalla(formatear(result.current))
    }
    // Backspace, borra el ultimo caracter y rehabilita el punto si se quita
    else if (id === 'btnBack') {
      const nueva = pantalla.slice(0, -1)
      setPantalla(nueva)
      setPuntoDisabled(nueva.includes('.'))
    }
    // Porcentaje, divide el valor entre 100
    else if (id === 'btnPorcent') {
      setPuntoDisabled(false)
      const valPantalla = parseFloat(pantalla)
      setPantalla(formatear(valPantalla / 100))
    }
  }

  return { pantalla, puntoDisabled, handleButtonAction }
}
