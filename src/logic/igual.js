import { calcular } from './calcular'

// Resuelve la operacion pendiente y muestra el resultado
export function igual(ctx) {
  const { refs } = ctx
  refs.dato2.current = parseFloat(ctx.pantalla)
  ctx.setPuntoDisabled(true)
  refs.result.current = calcular(refs)
  ctx.setPantalla(String(refs.result.current))
  refs.dato1.current = 0
  refs.result.current = 0
  refs.ac.current = 0
  refs.b.current = 1
}
