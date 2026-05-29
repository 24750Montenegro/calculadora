// CE, limpia solo la pantalla
export function limpiarEntrada(ctx) {
  ctx.setPuntoDisabled(false)
  ctx.setPantalla('')
}

// C, limpia pantalla y reinicia los datos
export function limpiarTodo(ctx) {
  ctx.setPantalla('')
  ctx.setPuntoDisabled(false)
  ctx.refs.dato1.current = 0
  ctx.refs.dato2.current = 0
  ctx.refs.result.current = 0
}
