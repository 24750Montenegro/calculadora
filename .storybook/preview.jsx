import '../src/index.css'
import '../src/Calculadora.css'

// Envuelve cada historia con el contenedor de la calculadora
export const decorators = [
  (Story) => (
    <div className="calculadora" style={{ width: 'auto' }}>
      <Story />
    </div>
  ),
]

export default { parameters: {} }
