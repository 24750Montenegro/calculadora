import { useState, useRef } from 'react'
import './Calculadora.css'

// Botones de la calculadora en orden de la cuadricula
const botones = [
  { id: 'btnPorcent', text: '%', clase: 'operador' },
  { id: 'btnCE', text: 'CE', clase: 'limpiar' },
  { id: 'btnC', text: 'C', clase: 'limpiar' },
  { id: 'btnBack', text: '⌫', clase: 'especial' },
  { id: 'btnUnoX', text: '1/x', clase: 'operador' },
  { id: 'btnCuadrado', text: 'x²', clase: 'operador' },
  { id: 'btnRaiz', text: '√', clase: 'operador' },
  { id: 'btnDivi', text: '/', clase: 'operador' },
  { id: 'btnSiete', text: '7' },
  { id: 'btnOcho', text: '8' },
  { id: 'btnNueve', text: '9' },
  { id: 'btnPor', text: '*', clase: 'operador' },
  { id: 'btnCuatro', text: '4' },
  { id: 'btnCinco', text: '5' },
  { id: 'btnSeis', text: '6' },
  { id: 'btnMenos', text: '-', clase: 'operador' },
  { id: 'btnUno', text: '1' },
  { id: 'btnDos', text: '2' },
  { id: 'btnTres', text: '3' },
  { id: 'btnMas', text: '+', clase: 'operador' },
  { id: 'btnMasMenos', text: '+/-', clase: 'operador' },
  { id: 'btnCero', text: '0' },
  { id: 'btnPunto', text: '.' },
  { id: 'btnIgual', text: '=', clase: 'especial' },
]

function Calculadora() {
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

  // Digitos asociados a cada boton numerico
  const digitos = {
    btnUno: '1',
    btnDos: '2',
    btnTres: '3',
    btnCuatro: '4',
    btnCinco: '5',
    btnSeis: '6',
    btnSiete: '7',
    btnOcho: '8',
    btnNueve: '9',
    btnCero: '0',
  }

  const handleButtonAction = (id) => {
    // Botones del 0 al 9
    if (digitos[id] !== undefined) {
      setPantalla(pantalla + digitos[id])
    }
    // Punto decimal, se deshabilita tras usarlo
    else if (id === 'btnPunto') {
      if (pantalla.length === 0) {
        setPantalla(pantalla + '0.')
      } else {
        setPantalla(pantalla + '.')
      }
      setPuntoDisabled(true)
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
      if (b.current === 1) {
        result.current = dato1.current
      } else if (b.current === 0) {
        ac.current = dato1.current + ac.current
      }
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
  }

  return (
    <div className="calculadora">
      <input
        className="pantalla"
        type="text"
        value={pantalla}
        placeholder="0"
        readOnly
      />
      <div className="teclado">
        {botones.map((boton) => (
          <button
            key={boton.id}
            className={boton.clase || ''}
            disabled={boton.id === 'btnPunto' && puntoDisabled}
            onClick={() => handleButtonAction(boton.id)}
          >
            {boton.text}
          </button>
        ))}
      </div>
      <p className="autor">Juan Francisco Montenegro Aguirre</p>
    </div>
  )
}

export default Calculadora
