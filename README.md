# ❤️ Página Web Romántica - "Te Quiero Mucho y Más, Te Amo"

Una página web moderna, elegante e interactiva diseñada especialmente para expresar tu amor en una hermosa paleta **rojo y blanco**.

---

## 🌟 Características Incluidas

1. **Paleta Rojo y Blanco Romántica**: Tonos carmesí, rubí, rosa pastel y blanco perla con efectos de cristal (*Glassmorphism*).
2. **Lluvia de Corazones Flotantes**: Fondo dinámico en Canvas con corazones y partículas que flotan suavemente.
3. **Sobre de Carta 3D Interactivo**: Un sobre cerrado con sello de corazón que se abre al tocarlo y revela una carta de amor sincera y conmovedora.
4. **Contador de Tiempo Juntos**: Muestra en tiempo real los días, horas, minutos y segundos transcurridos desde su fecha especial.
5. **El Medidor de Amor**: Botón interactivo que va incrementando el porcentaje de amor con cada toque hasta desbordar el sistema con *"Amor Infinito ∞"* y fuegos artificiales de corazones.
6. **Tarjetas de Razones para Amar**: Razones románticas detalladas con animaciones suaves.
7. **Galería Estilo Polaroid**: Marcos fotográficos románticos listos para lucir sus fotos juntos.
8. **Generador de Pensamientos**: Botón para mostrar mensajes de amor aleatorios cada vez que ella lo presione.
9. **Música Romántica**: Reproductor con melodía ambiental dulce sintetizada directamente en el navegador (Web Audio API), funciona sin necesidad de internet ni archivos externos.
10. **100% Adaptada a Móviles**: Se ve increíble en teléfonos (Android y iPhone) y en computadoras.

---

## 🚀 Cómo Abrir la Página

### Método 1: Doble Clic Directo (El más rápido)
1. Abre la carpeta: `C:\Users\Luis\.gemini\antigravity\scratch\pagina-romantica\`
2. Haz doble clic sobre el archivo **`index.html`**.
3. Se abrirá automáticamente en tu navegador favorito (Chrome, Edge, etc.).

### Método 2: Servidor Local (Opcional)
Si tienes Python instalado, puedes abrir una terminal en esta carpeta y ejecutar:
```bash
python -m http.server 8080
```
Y luego abrir en tu navegador: `http://localhost:8080`

---

## 🎨 Cómo Personalizarla

### 1. Cambiar el Nombre de tu Novia
Abre el archivo `index.html` con cualquier editor de texto (o Bloc de notas) y busca:
- Línea 37: `<div class="hero-badge">❤️ Para la mujer más hermosa de mi vida ❤️</div>`
  *(Puedes poner: `❤️ Para [Nombre de tu novia], el amor de mi vida ❤️`)*
- Línea 78: `<h3 class="letter-salutation">Mi amor hermoso,</h3>`
  *(Puedes poner: `Mi querida [Nombre],`)*

### 2. Cambiar la Fecha de Inicio / Aniversario
Abre el archivo `script.js` y en la línea 9 encontrarás:
```javascript
const FECHA_INICIO = new Date(2026, 0, 10, 0, 0, 0); // 10 de Enero de 2026
```
*(Si su historia comenzó en un año anterior como 2025, 2024 o 2023, solo cambia el primer número por tu año).*

### 3. Poner Fotos Reales en la Galería Polaroid
En `index.html`, en la sección de la galería (alrededor de la línea 170):
Reemplaza los bloques `<div class="romantic-illu">...</div>` por tus imágenes, por ejemplo:
```html
<img src="foto1.jpg" alt="Nosotros" style="width:100%; height:100%; object-fit:cover; border-radius:4px;">
```
*(Guarda tus fotos en la misma carpeta que `index.html`)*.

---

## 📱 Cómo Subirla a Internet Gratis para Mandársela a su Celular

Para que ella pueda abrirla desde su WhatsApp con un enlace propio:

### Opción A: Netlify Drop (La más fácil y rápida, sin programar nada)
1. Entra en tu navegador a: [app.netlify.com/drop](https://app.netlify.com/drop)
2. Arrastra la carpeta completa `pagina-romantica` y suéltala en la página.
3. ¡Listo! En 5 segundos te generará un enlace web público que puedes copiar y enviarle a ella.

### Opción B: Vercel o GitHub Pages
También puedes subir la carpeta a tu cuenta de GitHub y activar **GitHub Pages** en la pestaña *Settings -> Pages*.
