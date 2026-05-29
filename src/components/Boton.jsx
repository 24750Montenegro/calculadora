// Boton individual de la calculadora
function Boton({ id, text, clase, disabled, onClick }) {
  return (
    <button className={clase || ''} disabled={disabled}
      onClick={() => onClick(id)}>
      {text}
    </button>
  )
}

export default Boton
