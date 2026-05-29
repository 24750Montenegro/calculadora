import { digitos } from '../data/digitos'
import { operadores } from '../data/operadores'
import { unarios } from '../data/unarios'
import { ingresarDigito, ingresarPunto } from './entrada'
import { operar } from './operar'
import { igual } from './igual'
import { limpiarEntrada, limpiarTodo } from './limpiar'
import { unario } from './unario'
import { retroceso } from './retroceso'

// Enruta cada boton a su manejador
export function dispatch(id, ctx) {
  if (digitos[id] !== undefined) return ingresarDigito(ctx, digitos[id])
  if (operadores[id] !== undefined) return operar(ctx, operadores[id])
  if (unarios[id]) return unario(ctx, unarios[id])
  const tabla = { btnPunto: ingresarPunto, btnIgual: igual,
    btnCE: limpiarEntrada, btnC: limpiarTodo, btnBack: retroceso }
  if (tabla[id]) tabla[id](ctx)
}
