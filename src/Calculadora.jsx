import './Calculadora.css'
import Pantalla from './components/Pantalla'
import Teclado from './components/Teclado'
import { useCalculadora } from './hooks/useCalculadora'

function Calculadora() {
  const { pantalla, puntoDisabled, handleButtonAction } = useCalculadora()
  return (
    <div className="calculadora">
      <Pantalla valor={pantalla} />
      <Teclado puntoDisabled={puntoDisabled} onButton={handleButtonAction} />
      <p className="autor">Juan Francisco Montenegro Aguirre</p>
    </div>
  )
}

export default Calculadora
