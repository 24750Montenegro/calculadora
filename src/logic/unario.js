// Operaciones de un solo operando
const ops = {
  signo: (n) => n * -1,
  cuadrado: (n) => n * n,
  raiz: (n) => Math.sqrt(n),
  inverso: (n) => 1 / n,
  porcent: (n) => n / 100,
}

export function unario(ctx, tipo) {
  ctx.setPuntoDisabled(false)
  const n = parseFloat(ctx.pantalla)
  ctx.setPantalla(String(ops[tipo](n)))
}
