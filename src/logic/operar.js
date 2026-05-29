// Acumula los sustraendos para la resta sucesiva
function acumularResta(refs) {
  if (refs.b.current === 1) refs.result.current = refs.dato1.current
  else if (refs.b.current === 0) refs.ac.current = refs.dato1.current + refs.ac.current
  refs.b.current = 0
}

// Guarda el operando y registra la operacion pendiente
export function operar(ctx, codigo) {
  const { refs } = ctx
  refs.dato1.current = parseFloat(ctx.pantalla)
  if (codigo === 1) refs.result.current = refs.dato1.current + refs.result.current
  if (codigo === 2) acumularResta(refs)
  ctx.setPantalla('')
  refs.op.current = codigo
  ctx.setPuntoDisabled(false)
}
