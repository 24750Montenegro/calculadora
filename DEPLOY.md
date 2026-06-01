# Despliegue

La app se sirve bajo `https://bombardeen-palencia.xyz/franc/calculadora/`.

Arquitectura: el nginx del host (puerto 80) hace `proxy_pass` de
`/franc/calculadora/` hacia el contenedor Docker en `localhost:24750`,
que sirve el build estatico de Vite con nginx.

## Primer despliegue en el servidor

```bash
git clone https://github.com/24750Montenegro/calculadora.git ~/calculadora
cd ~/calculadora
cp .env.example .env          # ajusta HOST_PORT / VITE_BASE si hace falta
docker compose up -d --build
```

Luego, agregar el bloque de `deploy/nginx-host.conf` dentro del `server { }`
de `bombardeen-palencia.xyz` (`/etc/nginx/sites-available/csgo-api`) y recargar:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Actualizaciones

```bash
cd ~/calculadora
git pull
docker compose up -d --build
```

> Solo se clona el codigo fuente; `node_modules` y `dist` viven dentro de la
> imagen Docker, no se suben al servidor.
