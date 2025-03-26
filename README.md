## Configurar concurrently para ejecutar front y back

1. Instalamos `concurrently`: `npm i concurrently --save-dev` como dependencias de desarrollo.

2. Validamos el script que se ejecutara en al back:
```
// package.json (backend)
{
  "scripts": {
    "start": "npm run build && node dist/app.js"
  }
}
    ** or **
// package.json (backend)
{
  "scripts": {
    "start": "node server.js"
  }
}
``` 
3. Validamos el script que se ejecutara en al front:
```
// package.json (frontend)
{
  "scripts": {
    "dev": "vite"
  }
}
```

4. Configuramos el proyecto global
// package.json (proyecto global)
{
  "scripts": {
    "start": "concurrently \"cd backend && npm start\" \"cd frontend && npm run dev\"",
  }
}

## Intalar bootstrap en vite

1. instalamos los paquetes `npm install bootstrap @popperjs/core`

2. agregamos las librerias en el archivo principal main.ts o main.js

```
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
```