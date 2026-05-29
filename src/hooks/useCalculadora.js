import { useState, useRef } from 'react'
import { dispatch } from '../logic/dispatch'

// Estado y logica de la calculadora
export function useCalculadora() {
  const refs = {
    dato1: useRef(0), dato2: useRef(0), result: useRef(0),
    ac: useRef(0), op: useRef(0), b: useRef(1),
  }
  const [pantalla, setPantalla] = useState('')
  const [puntoDisabled, setPuntoDisabled] = useState(false)
  const handleButtonAction = (id) =>
    dispatch(id, { refs, pantalla, setPantalla, setPuntoDisabled })
  return { pantalla, puntoDisabled, handleButtonAction }
}
