import { useState, useRef } from 'react'
import './Calculadora.css'

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

  const handleButtonAction = (id) => {
    // Logica de cada boton
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
      <p className="autor">Juan Francisco Montenegro Aguirre</p>
    </div>
  )
}

export default Calculadora
