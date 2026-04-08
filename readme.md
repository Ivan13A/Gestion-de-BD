# 🚀 Guía de instalación y ejecución del proyecto

## Requisitos previos

Asegúrate de tener instalado lo siguiente antes de comenzar:

- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

---

## Pasos para correr el proyecto

### 1. Instalar dependencias

```bash
npm install
```

---

### 2. Levantar los servicios con Docker

```bash
docker compose up -d
```

Esto levantará los contenedores en segundo plano. Una vez arriba, **detén el contenedor de MongoDB** desde Docker Desktop (o con el comando de abajo) y deja corriendo únicamente **Redis**.

```bash
docker stop <nombre-del-contenedor-mongodb>
```

> 💡 Puedes ver el nombre exacto del contenedor con `docker ps`.

---

### 3. Configurar la base de datos en MongoDB Compass

1. Abre **MongoDB Compass**
2. Conéctate usando la siguiente URI:

```
mongodb://localhost:27017
```

3. Crea una base de datos llamada **`test`**
4. Dentro de `test`, crea las siguientes colecciones:
   - `tournament`
   - `usuario`

---

### 4. Ejecutar el proyecto

```bash
npm run dev
```

---

## Resumen rápido

| Paso | Comando |
|------|---------|
| Instalar dependencias | `npm install` |
| Levantar Docker | `docker compose up -d` |
| Apagar MongoDB en Docker | `docker stop <contenedor-mongo>` |
| Ejecutar el proyecto | `npm run dev` |