# Dashboard de Estadísticas - Criptomonedas 🚀

Este es un panel interactivo y en tiempo real construido con **React** y **Vite**. Muestra estadísticas del mercado de criptomonedas consumiendo datos de una API pública (CoinGecko). 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Características Principales

* **Visualizaciones dinámicas:** Gráficos de barras, líneas y de pastel gracias a `recharts`.
* **Glassmorphism Design:** Elementos y tarjetas con un diseño semi-transparente premium gracias a Tailwind CSS.
* **Actualización en Tiempo Real:** Configurado para consultar nuevos datos cada 60 segundos automáticamente.
* **Modo Oscuro Elegante:** Paleta de colores atractiva enfocada en dark mode.

## 🛠 Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente en tu máquina.

### 1. Clonar el repositorio y navegar a la carpeta
_(Asumiendo que hiciste un git clone)_
```bash
cd dashBoardStatsClima
```

### 2. Instalar las dependencias
Este proyecto usa `npm` por defecto.
```bash
npm install
```

### 3. Configurar Variables de Entorno (.env)
Este proyecto requiere consumir una API pública. Para mayor seguridad y configuración flexible, la URL de la API se configura como variable de entorno.

El archivo `.gitignore` ya está configurado para **ignorar** los archivos `.env` (donde reside tu data "sensible").

* Copia el diseño estructural del archivo de ejemplo `.env.example`:
```bash
cp .env.example .env
```
* O simplemente crea el archivo `.env` en la raíz del proyecto y añade:
```env
VITE_API_URL="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
```
_(Nota: A pesar de ser una API pública y no requerir "Token" en este ejemplo específico, usar el enviroment variable es la práctica estándar)._

### 4. Lanzar el Servidor de Desarrollo
```bash
npm run dev
```

Esto desplegará la app en [http://localhost:5173/](http://localhost:5173/). 

## 🏗 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo usando Vite.
- `npm run build`: Genera los archivos compilados para producción dentro del folder `/dist`.
- `npm run preview`: Previsualiza (sirve) el entorno de build a manera local.
- `npm run lint`: Ejecuta ESLint en los archivos `.jsx` o `.js` para cuidar las convenciones del código.

## 📦 Librerías Extra Destacadas

* **[Axios](https://axios-http.com/):** Para manejar más eficientemente las llamadas HTTP.
* **[Recharts](https://recharts.org/):** Componentes visuales robustos de todo tipo de gráfico.
* **[Lucide-React](https://lucide.dev/):** Iconografía moderna, personalizable y limpia.

---

_Proyecto creado como demostrador funcional de UI avanzada y consumo de API en React._
