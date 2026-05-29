// Maximo de caracteres permitidos en pantalla
const LIMITE = 9

// Agrega un digito si no se supera el limite
export function ingresarDigito(ctx, digito) {
  if (ctx.pantalla.length >= LIMITE) return
  ctx.setPantalla(ctx.pantalla + digito)
}

// Punto decimal, se deshabilita tras usarlo
export function ingresarPunto(ctx) {
  if (ctx.pantalla.length >= LIMITE) return
  const base = ctx.pantalla.length === 0 ? '0.' : ctx.pantalla + '.'
  ctx.setPantalla(base)
  ctx.setPuntoDisabled(true)
}
