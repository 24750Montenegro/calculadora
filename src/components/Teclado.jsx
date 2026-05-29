import Boton from './Boton'
import { botones } from '../data/botones'

// Cuadricula de botones
function Teclado({ puntoDisabled, onButton }) {
  return (
    <div className="teclado">
      {botones.map((b) => (
        <Boton key={b.id} {...b} onClick={onButton}
          disabled={b.id === 'btnPunto' && puntoDisabled} />
      ))}
    </div>
  )
}

export default Teclado
