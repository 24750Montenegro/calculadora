// Borra el ultimo caracter y rehabilita el punto si se quita
export function retroceso(ctx) {
  const nueva = ctx.pantalla.slice(0, -1)
  ctx.setPantalla(nueva)
  ctx.setPuntoDisabled(nueva.includes('.'))
}
