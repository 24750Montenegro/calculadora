// Agrega un digito a la pantalla
export function ingresarDigito(ctx, digito) {
  ctx.setPantalla(ctx.pantalla + digito)
}

// Punto decimal, se deshabilita tras usarlo
export function ingresarPunto(ctx) {
  const base = ctx.pantalla.length === 0 ? '0.' : ctx.pantalla + '.'
  ctx.setPantalla(base)
  ctx.setPuntoDisabled(true)
}
