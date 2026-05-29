import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import Calculadora from './Calculadora'

afterEach(cleanup)

// Pulsa una secuencia de botones por su texto
function pulsar(...textos) {
  for (const texto of textos) fireEvent.click(screen.getByText(texto))
}

// Devuelve el valor mostrado en pantalla
function pantalla() {
  return screen.getByRole('textbox').value
}

describe('Calculadora', () => {
  it('suma dos numeros', () => {
    render(<Calculadora />)
    pulsar('7', '+', '8', '=')
    expect(pantalla()).toBe('15')
  })

  it('muestra ERROR cuando el resultado es negativo', () => {
    render(<Calculadora />)
    pulsar('4', '-', '9', '=')
    expect(pantalla()).toBe('ERROR')
  })

  it('muestra ERROR cuando el resultado supera el maximo', () => {
    render(<Calculadora />)
    pulsar('9', '9', '9', '9', '9', '*', '9', '9', '9', '9', '9', '=')
    expect(pantalla()).toBe('ERROR')
  })

  it('limita la entrada a nueve caracteres', () => {
    render(<Calculadora />)
    pulsar('9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9', '9')
    expect(pantalla()).toBe('999999999')
  })

  it('calcula el modulo con el boton de porcentaje', () => {
    render(<Calculadora />)
    pulsar('1', '0', '%', '3', '=')
    expect(pantalla()).toBe('1')
  })
})
