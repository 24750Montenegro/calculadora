import Teclado from './Teclado'

export default {
  title: 'Calculadora/Teclado',
  component: Teclado,
  args: { onButton: () => {} },
}

// Teclado completo
export const Default = {
  args: { puntoDisabled: false },
}

// Teclado con el punto decimal deshabilitado
export const PuntoDeshabilitado = {
  args: { puntoDisabled: true },
}
