import Pantalla from './Pantalla'

export default {
  title: 'Calculadora/Pantalla',
  component: Pantalla,
}

// Pantalla sin valor
export const Vacia = {
  args: { valor: '' },
}

// Pantalla con un numero
export const ConValor = {
  args: { valor: '12345' },
}

// Pantalla mostrando un error
export const Error = {
  args: { valor: 'ERROR' },
}
