import Boton from './Boton'

export default {
  title: 'Calculadora/Boton',
  component: Boton,
  decorators: [(Story) => <div className="teclado"><Story /></div>],
  args: { onClick: () => {} },
}

// Boton numerico
export const Numero = {
  args: { id: 'btnSiete', text: '7' },
}

// Boton de operacion en rojo
export const Operador = {
  args: { id: 'btnMas', text: '+', clase: 'operador' },
}

// Boton destacado igual y backspace
export const Especial = {
  args: { id: 'btnIgual', text: '=', clase: 'especial' },
}
