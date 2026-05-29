// Calcula segun la operacion pendiente
export function calcular({ op, dato1, dato2, result, ac }) {
  switch (op.current) {
    case 1: return result.current + dato2.current
    case 2: return result.current - (dato2.current + ac.current)
    case 3: return dato1.current * dato2.current
    case 4: return dato1.current / dato2.current
  }
  return result.current
}
