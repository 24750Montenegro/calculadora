import './Calculadora.css'
import { botones } from './data/botones'
import { useCalculadora } from './hooks/useCalculadora'

function Calculadora() {
  const { pantalla, puntoDisabled, handleButtonAction } = useCalculadora()
  return (
    <div className="calculadora">
      <input className="pantalla" type="text" value={pantalla}
        placeholder="0" readOnly />
      <div className="teclado">
        {botones.map((b) => (
          <button key={b.id} className={b.clase || ''}
            disabled={b.id === 'btnPunto' && puntoDisabled}
            onClick={() => handleButtonAction(b.id)}>
            {b.text}
          </button>
        ))}
      </div>
      <p className="autor">Juan Francisco Montenegro Aguirre</p>
    </div>
  )
}

export default Calculadora
