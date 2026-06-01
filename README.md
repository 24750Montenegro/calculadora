# Calculadora

Calculadora web construida con React 19 y Vite. Autor: Juan Francisco Montenegro Aguirre.

## Deploy

Aplicacion en produccion:

**https://bombardeen-palencia.xyz/franc/calculadora/**

El servidor (`35.232.139.23`) corre nginx en el puerto 80, que hace `proxy_pass`
de la ruta `/franc/calculadora/` hacia un contenedor Docker que escucha en
`localhost:24750`. El detalle completo del despliegue esta en [DEPLOY.md](DEPLOY.md).

## Requisitos

- Node.js 20 o superior y npm (para el modo local), o
- Docker con el plugin Compose (para el modo contenedor).

## Levantar el proyecto localmente (Node + Vite)

Instalar dependencias y arrancar el servidor de desarrollo con recarga en caliente:

```bash
npm install
npm run dev
```

Vite imprime la URL local (por defecto http://localhost:5173/).

Otros scripts disponibles:

```bash
npm run build      # genera el build de produccion en dist/
npm run preview    # sirve el build de produccion para revisarlo
npm run lint       # corre ESLint
npm run storybook  # abre Storybook en http://localhost:6006
```

## Pruebas

Las pruebas usan Vitest y Testing Library. Para ejecutarlas:

```bash
npm test
```

Resultado esperado: 5 pruebas en verde (suma, ERROR por resultado negativo,
ERROR por exceder el maximo, limite de 9 caracteres y modulo con el boton `%`).

## Levantar con Docker

El proyecto se configura mediante un archivo `.env`. Ese archivo no se sube al
repositorio: solo se versiona la plantilla `.env.example`. El primer paso es
copiarla a `.env`.

Linux / macOS:

```bash
cp .env.example .env
```

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Windows (CMD):

```cmd
copy .env.example .env
```

Variables del `.env`:

- `HOST_PORT`: puerto del host donde se expone el contenedor (por defecto `24750`).
- `VITE_BASE`: ruta base con la que se compila la app. Debe terminar en `/`.
  - Para el deploy en el servidor es `/franc/calculadora/` (nginx del host quita ese prefijo).
  - Para correrlo en local y abrirlo en la raiz, ponlo en `/`.

Luego construir y levantar el contenedor (igual en Linux, macOS y Windows):

```bash
docker compose up --build
```

Con `VITE_BASE=/` la app queda en http://localhost:24750/. Para detenerla,
`Ctrl+C`, o `docker compose down` si se lanzo en segundo plano con `-d`.

## Arquitectura

Aplicacion de una sola pagina (SPA). El flujo de renderizado es:

```
src/main.jsx        Punto de entrada, monta <App> en #root
  -> App.jsx        Contenedor minimo
     -> Calculadora.jsx
        -> Pantalla.jsx   Muestra el valor actual (input de solo lectura)
        -> Teclado.jsx    Cuadricula de botones
           -> Boton.jsx   Boton individual, emite su id al hacer click
```

Separacion de responsabilidades:

- `src/hooks/useCalculadora.js`: concentra todo el estado y la logica. Expone
  `pantalla`, `puntoDisabled` y `handleButtonAction(id)`. Usa `useState` para lo
  que se renderiza (texto en pantalla y si el punto esta deshabilitado) y `useRef`
  para los operandos y acumuladores que no necesitan re-render (`dato1`, `dato2`,
  `result`, `ac`, `op`, `b`).
- `src/data/botones.js`: define los botones (id, texto y clase) en el orden de la
  cuadricula. `Teclado` los recorre para renderizar cada `Boton`.
- Cada `Boton` solo conoce su `id`; al hacer click llama a `handleButtonAction(id)`,
  que decide la operacion. Esto mantiene los componentes sin logica de calculo.

Tooling:

- Vite como bundler y servidor de desarrollo (`vite.config.js`). La opcion `base`
  se toma de `process.env.VITE_BASE` para soportar el despliegue bajo un subpath.
- Vitest + Testing Library para pruebas (entorno jsdom, configurado en
  `vite.config.js` y `src/test/setup.js`). Las pruebas estan en
  `src/Calculadora.test.jsx`.
- Storybook para documentar los componentes (`Pantalla`, `Boton`, `Teclado`).
- Docker multi-stage (`Dockerfile`): una etapa compila con Node y otra sirve el
  build estatico con nginx.

## Funcionalidades

- Ingreso de digitos del 0 al 9 y punto decimal (el punto se deshabilita una vez
  usado y se rehabilita al borrarlo con backspace).
- Operaciones basicas: suma, resta sucesiva, multiplicacion y division.
- Modulo mediante el boton `%`.
- Operaciones unarias: cambio de signo (`+/-`), cuadrado (`x2`), raiz cuadrada
  (`raiz`) e inverso (`1/x`).
- Borrado: `CE` limpia la pantalla, `C` reinicia los operandos y la pantalla, y
  el backspace borra el ultimo caracter.
- Validaciones: la entrada se limita a 9 caracteres y el resultado muestra `ERROR`
  si es negativo, invalido (NaN) o mayor a 999999999.
