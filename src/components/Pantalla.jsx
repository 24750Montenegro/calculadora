// Muestra el valor actual de la calculadora
function Pantalla({ valor }) {
  return (
    <input className="pantalla" type="text" value={valor}
      placeholder="0" readOnly />
  )
}

export default Pantalla
