# Ejercicios prácticos de Accesibilidad Web

## Ejercicio 1: Convertir div en botón accesible

Tienes un div que funciona como botón pero no es accesible. Conviértelo en un elemento `<button>` apropiado.

**Código inicial (incorrecto):**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 1</title>
  <style>
    .btn {
      padding: 10px 20px;
      background: #007bff;
      color: white;
      cursor: pointer;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="btn" onclick="alert('Formulario enviado')">
    Enviar formulario
  </div>
</body>
</html>
```

---

## Ejercicio 2: Añadir aria-label a botón de icono

Un botón solo muestra un icono (emoji o SVG) sin texto. Hazlo accesible para lectores de pantalla.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 2</title>
</head>
<body>
  <button>🔍</button>
  <button>❌</button>
  <button>
    <svg width="20" height="20" viewBox="0 0 20 20">
      <path d="M10 0L12.5 7.5H20L14 12L16.5 20L10 15L3.5 20L6 12L0 7.5H7.5L10 0Z"/>
    </svg>
  </button>
</body>
</html>
```

---

## Ejercicio 3: Mensaje dinámico con aria-live="polite"

Crea un formulario donde al enviar se muestre un mensaje de éxito que sea anunciado por lectores de pantalla.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 3</title>
</head>
<body>
  <form id="myForm">
    <label for="name">Nombre:</label>
    <input id="name" type="text" required>
    <button type="submit">Enviar</button>
  </form>
  
  <div id="message" style="display: none; color: green; margin-top: 10px;">
    Formulario enviado correctamente
  </div>
  
  <script>
    document.getElementById('myForm').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('message').style.display = 'block';
    });
  </script>
</body>
</html>
```

---

## Ejercicio 4: Alerta crítica con aria-live="assertive"

Simula un error de conexión que debe anunciarse inmediatamente.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 4</title>
</head>
<body>
  <button id="simulateError">Simular error de conexión</button>
  
  <div id="errorContainer"></div>
  
  <script>
    document.getElementById('simulateError').addEventListener('click', () => {
      const error = document.createElement('p');
      error.style.color = 'red';
      error.textContent = '❌ Error: No se pudo conectar al servidor';
      document.getElementById('errorContainer').appendChild(error);
    });
  </script>
</body>
</html>
```

---

## Ejercicio 5: Enlace activo con aria-current

En una navegación, indica cuál es la página actual.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 5</title>
  <style>
    nav a { margin-right: 15px; }
    .active { font-weight: bold; color: #007bff; }
  </style>
</head>
<body>
  <nav>
    <a href="/" class="active">Inicio</a>
    <a href="/about">Nosotros</a>
    <a href="/services">Servicios</a>
    <a href="/contact">Contacto</a>
  </nav>
</body>
</html>
```

---

## Ejercicio 6: Tabs accesibles en React

Implementa un componente de pestañas (tabs) totalmente accesible con navegación por teclado.

**Código inicial:**

```jsx
import { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  
  const tabs = [
    { id: 1, label: 'Perfil', content: 'Información de perfil' },
    { id: 2, label: 'Configuración', content: 'Opciones de configuración' },
    { id: 3, label: 'Notificaciones', content: 'Preferencias de notificaciones' }
  ];
  
  return (
    <div>
      <div>
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(i)}
            style={{
              fontWeight: i === activeTab ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div style={{ marginTop: '20px' }}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

export default Tabs;
```

**Explicación**
- Añadir `role="tablist"`, `role="tab"`, `role="tabpanel"`
- Implementar `aria-selected` y `aria-controls`
- Añadir navegación con flechas (ArrowLeft, ArrowRight)
- Solo el tab activo debe tener `tabindex="0"`, los demás `tabindex="-1"`

---

## Ejercicio 7: Carrusel con control de pausa

Crea un carrusel de imágenes que rota automáticamente pero permite pausarlo.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 7</title>
  <style>
    .carousel { position: relative; width: 600px; height: 400px; }
    .slide { display: none; width: 100%; height: 100%; }
    .slide.active { display: block; }
  </style>
</head>
<body>
  <div class="carousel">
    <div class="slide active">
      <img src="https://via.placeholder.com/600x400?text=Slide+1" alt="Imagen 1">
    </div>
    <div class="slide">
      <img src="https://via.placeholder.com/600x400?text=Slide+2" alt="Imagen 2">
    </div>
    <div class="slide">
      <img src="https://via.placeholder.com/600x400?text=Slide+3" alt="Imagen 3">
    </div>
    
    <button id="playPause">⏸</button>
  </div>
  
  <script>
    let currentSlide = 0;
    let autoplay = true;
    let interval;
    
    function showSlide(n) {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(s => s.classList.remove('active'));
      slides[n].classList.add('active');
    }
    
    function nextSlide() {
      const slides = document.querySelectorAll('.slide');
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    function startAutoplay() {
      interval = setInterval(nextSlide, 3000);
    }
    
    startAutoplay();
    
    document.getElementById('playPause').addEventListener('click', function() {
      autoplay = !autoplay;
      if (autoplay) {
        this.textContent = '⏸';
        startAutoplay();
      } else {
        this.textContent = '▶';
        clearInterval(interval);
      }
    });
  </script>
</body>
</html>
```

**Explicación**
- Añadir `aria-label` descriptivo al botón de pausa/reproducción
- Envolver el carrusel en `<section>` con `aria-label`
- Añadir controles de anterior/siguiente
- Bonus: Añadir región viva que anuncie el slide actual

---

## Ejercicio 8: Enlaces descriptivos

Mejora enlaces genéricos a enlaces descriptivos.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 8</title>
</head>
<body>
  <article>
    <h2>Introducción a React</h2>
    <p>React es una biblioteca de JavaScript para construir interfaces de usuario...</p>
    <a href="/articles/react-intro">Leer más</a>
  </article>
  
  <article>
    <h2>Guía de Vue.js</h2>
    <p>Vue.js es un framework progresivo para construir interfaces...</p>
    <a href="/articles/vue-guide">Click aquí</a>
  </article>
  
  <article>
    <h2>Angular para principiantes</h2>
    <p>Angular es una plataforma para construir aplicaciones web...</p>
    <a href="/articles/angular-beginners">Ver artículo</a>
  </article>
</body>
</html>
```

**Explicación**
- Hacer enlaces más descriptivos e informativos
- Evitar textos como "leer más", "click aquí"
- Alternativamente, usar `aria-label` o `aria-labelledby`

---

## Ejercicio 9: Página de prueba para herramientas (WAVE, axe, Lighthouse)

Corrige todos los errores de accesibilidad en esta página y luego pruébala con WAVE, axe DevTools y Lighthouse.

**Código inicial (lleno de errores):**

```html
<!DOCTYPE html>
<html>
<head>
  <title>Galería de Productos</title>
  <style>
    body { font-family: Arial; }
    .product { margin: 20px; padding: 10px; border: 1px solid #ddd; }
    .btn { background: #28a745; color: #fff; padding: 8px 16px; cursor: pointer; }
  </style>
</head>
<body>
  <div style="font-size: 24px; font-weight: bold;">Galería de Productos</div>
  
  <div class="product">
    <img src="product1.jpg">
    <h3 style="color: #ccc; background: #eee;">Producto 1</h3>
    <p>Descripción del producto</p>
    <div class="btn" onclick="addToCart()">Añadir al carrito</div>
  </div>
  
  <div class="product">
    <img src="product2.jpg" alt="">
    <div style="font-size: 18px;">Producto 2</div>
    <p>Descripción del producto</p>
    <a href="#" style="color: #999;">Ver detalles</a>
  </div>
  
  <form>
    <input type="text" placeholder="Tu email">
    <input type="submit" value="Suscribirse">
  </form>
  
  <script>
    function addToCart() {
      alert('Añadido al carrito');
    }
  </script>
</body>
</html>
```

---

## Ejercicio 10: Formulario con labels visibles

Transforma un formulario que solo usa placeholders a uno con labels apropiados.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 10</title>
</head>
<body>
  <h1>Registro</h1>
  
  <form>
    <input type="text" placeholder="Nombre completo">
    <input type="email" placeholder="Email">
    <input type="password" placeholder="Contraseña">
    <input type="password" placeholder="Confirmar contraseña">
    <input type="tel" placeholder="Teléfono">
    <button type="submit">Registrarse</button>
  </form>
</body>
</html>
```

---

## Ejercicio 11: Mensajes de error accesibles

Implementa validación de formulario con mensajes de error que sean anunciados por lectores de pantalla.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 11</title>
  <style>
    .error { color: red; font-size: 14px; }
    .invalid { border: 2px solid red; }
  </style>
</head>
<body>
  <form id="loginForm">
    <div>
      <label for="username">Usuario</label>
      <input id="username" type="text">
      <span class="error" id="username-error" style="display: none;"></span>
    </div>
    
    <div>
      <label for="password">Contraseña</label>
      <input id="password" type="password">
      <span class="error" id="password-error" style="display: none;"></span>
    </div>
    
    <button type="submit">Iniciar sesión</button>
  </form>
  
  <script>
    document.getElementById('loginForm').addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = document.getElementById('username');
      const password = document.getElementById('password');
      let valid = true;
      
      if (username.value.length < 3) {
        document.getElementById('username-error').textContent = 'Mínimo 3 caracteres';
        document.getElementById('username-error').style.display = 'block';
        username.classList.add('invalid');
        valid = false;
      }
      
      if (password.value.length < 6) {
        document.getElementById('password-error').textContent = 'Mínimo 6 caracteres';
        document.getElementById('password-error').style.display = 'block';
        password.classList.add('invalid');
        valid = false;
      }
      
      if (valid) {
        alert('Login exitoso');
      }
    });
  </script>
</body>
</html>
```

**Explicación**
- Añadir `aria-invalid` a inputs con error
- Añadir `aria-describedby` apuntando al mensaje de error
- Usar `role="alert"` en mensajes de error
- Limpiar errores al corregir

---

## Ejercicio 12: Agrupar campos con fieldset

Agrupa campos relacionados usando `<fieldset>` y `<legend>`.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 12</title>
</head>
<body>
  <h1>Formulario de Pedido</h1>
  
  <form>
    <h2>Información Personal</h2>
    <label for="name">Nombre</label>
    <input id="name" type="text">
    
    <label for="email">Email</label>
    <input id="email" type="email">
    
    <h2>Dirección de Envío</h2>
    <label for="street">Calle</label>
    <input id="street" type="text">
    
    <label for="city">Ciudad</label>
    <input id="city" type="text">
    
    <label for="zip">Código Postal</label>
    <input id="zip" type="text">
    
    <h2>Método de Pago</h2>
    <label>
      <input type="radio" name="payment" value="card">
      Tarjeta de Crédito
    </label>
    <label>
      <input type="radio" name="payment" value="paypal">
      PayPal
    </label>
    <label>
      <input type="radio" name="payment" value="transfer">
      Transferencia
    </label>
    
    <button type="submit">Realizar Pedido</button>
  </form>
</body>
</html>
```

---

## Ejercicio 13: Foco visible personalizado

Añade estilos de foco personalizados que sean visibles y estéticos.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 13</title>
  <style>
    button, input, a {
      margin: 10px;
      padding: 10px;
    }
    
    /* Alguien quitó el outline (MAL) */
    *:focus {
      outline: none;
    }
  </style>
</head>
<body>
  <button>Botón 1</button>
  <button>Botón 2</button>
  <input type="text" placeholder="Escribe aquí">
  <a href="#">Enlace de ejemplo</a>
</body>
</html>
```

**Explicación**
- Implementar `:focus-visible` para mostrar outline solo con teclado
- Crear un estilo de foco personalizado y visible
- Asegurar contraste 3:1 mínimo

---

## Ejercicio 14: Orden lógico de tabulación

Corrige el orden de tabulación de un formulario desordenado.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 14</title>
</head>
<body>
  <form>
    <div>
      <label for="email">Email</label>
      <input id="email" type="email" tabindex="3">
    </div>
    
    <div>
      <label for="name">Nombre</label>
      <input id="name" type="text" tabindex="1">
    </div>
    
    <div>
      <label for="phone">Teléfono</label>
      <input id="phone" type="tel" tabindex="2">
    </div>
    
    <button type="submit" tabindex="5">Enviar</button>
    <button type="reset" tabindex="4">Limpiar</button>
  </form>
</body>
</html>
```

**Explicación**
- Eliminar todos los `tabindex` positivos
- Reordenar el HTML para que el flujo sea natural
- Verificar que la tabulación sea: Nombre → Teléfono → Email → Enviar → Limpiar

---

## Ejercicio 15: Foco programático en modal

Al abrir un modal, mueve el foco dentro de él y atrápalo hasta que se cierre.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 15</title>
  <style>
    .modal-overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      justify-content: center;
      align-items: center;
    }
    
    .modal-overlay.active {
      display: flex;
    }
    
    .modal {
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
    }
  </style>
</head>
<body>
  <button id="openModal">Abrir Modal</button>
  
  <div class="modal-overlay" id="modalOverlay">
    <div class="modal">
      <h2>Confirmar Acción</h2>
      <p>¿Estás seguro de que deseas continuar?</p>
      <button id="confirm">Confirmar</button>
      <button id="cancel">Cancelar</button>
    </div>
  </div>
  
  <script>
    const openBtn = document.getElementById('openModal');
    const overlay = document.getElementById('modalOverlay');
    const cancelBtn = document.getElementById('cancel');
    
    openBtn.addEventListener('click', () => {
      overlay.classList.add('active');
    });
    
    cancelBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  </script>
</body>
</html>
```

**Explicación**
- Añadir `tabindex="-1"` al modal
- Mover foco al modal al abrir
- Restaurar foco al botón que lo abrió al cerrar
- Implementar cierre con tecla ESC
- Añadir `role="dialog"` y `aria-modal="true"`

---

## Ejercicio 16: Jerarquía correcta de encabezados

Corrige la jerarquía de headings de esta página.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 16</title>
</head>
<body>
  <h3>Mi Blog</h3>
  
  <div>
    <h1>Artículo Principal: Accesibilidad Web</h1>
    <p>Contenido del artículo...</p>
    
    <h4>¿Qué es accesibilidad?</h4>
    <p>Explicación...</p>
    
    <h2>Importancia</h2>
    <p>Detalles...</p>
  </div>
  
  <aside>
    <h4>Artículos Relacionados</h4>
    <ul>
      <li><a href="#">Artículo 1</a></li>
      <li><a href="#">Artículo 2</a></li>
    </ul>
  </aside>
</body>
</html>
```

---

## Ejercicio 17: Tabla con caption

**Enunciado:** Añade un caption descriptivo a una tabla de datos.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 17</title>
  <style>
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
  </style>
</head>
<body>
  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Laptop</td>
        <td>5</td>
        <td>$999</td>
      </tr>
      <tr>
        <td>Mouse</td>
        <td>25</td>
        <td>$19</td>
      </tr>
      <tr>
        <td>Teclado</td>
        <td>15</td>
        <td>$49</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

- Bonus: Añadir resumen en `<tfoot>`

---

## Ejercicio 18: Scope en tablas

**Enunciado:** Mejora la accesibilidad de una tabla compleja con `scope`.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 18</title>
  <style>
    table { border-collapse: collapse; }
    th, td { border: 1px solid #ccc; padding: 8px; }
  </style>
</head>
<body>
  <table>
    <caption>Ventas por Región y Trimestre</caption>
    <thead>
      <tr>
        <th>Región</th>
        <th>Q1</th>
        <th>Q2</th>
        <th>Q3</th>
        <th>Q4</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>Norte</th>
        <td>$50,000</td>
        <td>$55,000</td>
        <td>$60,000</td>
        <td>$58,000</td>
      </tr>
      <tr>
        <th>Sur</th>
        <td>$45,000</td>
        <td>$48,000</td>
        <td>$52,000</td>
        <td>$51,000</td>
      </tr>
      <tr>
        <th>Este</th>
        <td>$62,000</td>
        <td>$65,000</td>
        <td>$68,000</td>
        <td>$70,000</td>
      </tr>
    </tbody>
  </table>
</body>
</html>
```

---

## Ejercicio 19: No depender solo del color

Mejora un sistema de notificaciones que solo usa color para diferenciar tipos.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 19</title>
  <style>
    .notification {
      padding: 15px;
      margin: 10px 0;
      border-radius: 4px;
    }
    .success { background: #d4edda; }
    .warning { background: #fff3cd; }
    .error { background: #f8d7da; }
  </style>
</head>
<body>
  <div class="notification success">
    Operación completada exitosamente
  </div>
  
  <div class="notification warning">
    Tu sesión está por expirar
  </div>
  
  <div class="notification error">
    Error al procesar el pago
  </div>
</body>
</html>
```

**Explicación**
- Añadir iconos o texto que indique el tipo
- No depender solo del color de fondo
- Añadir `role="status"` o `role="alert"` según corresponda

---

## Ejercicio 20: Verificar contraste mínimo

Identifica y corrige problemas de contraste en esta página.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 20</title>
  <style>
    body {
      background: #fff;
      color: #333;
    }
    
    .hero {
      background: #f0f0f0;
      padding: 40px;
    }
    
    .hero h1 {
      color: #bbb;
    }
    
    .cta-button {
      background: #ffd700;
      color: #fff;
      padding: 12px 24px;
      border: none;
      font-size: 16px;
    }
    
    .footer {
      background: #222;
      color: #555;
      padding: 20px;
    }
    
    a {
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="hero">
    <h1>Bienvenido a Nuestro Sitio</h1>
    <p>Descubre productos increíbles</p>
    <button class="cta-button">Comprar Ahora</button>
  </div>
  
  <main>
    <p>Contenido principal con <a href="#">enlace importante</a></p>
  </main>
  
  <footer class="footer">
    <p>&copy; 2026 Mi Empresa. Todos los derechos reservados.</p>
  </footer>
</body>
</html>
```

**Explicación**
- Usar herramienta de contraste (WebAIM, DevTools)
- Identificar ratios que no cumplan 4.5:1
- Ajustar colores para cumplir WCAG AA
- Elementos a revisar: h1, botón CTA, footer, enlaces

---

## Ejercicio 21: Idioma del documento

Especifica correctamente el idioma de un documento multilingüe.

**Código inicial:**

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 21</title>
</head>
<body>
  <h1>Bienvenido / Welcome</h1>
  
  <section>
    <h2>Acerca de Nosotros</h2>
    <p>Somos una empresa líder en tecnología.</p>
  </section>
  
  <section>
    <h2>About Us</h2>
    <p>We are a leading technology company.</p>
  </section>
</body>
</html>
```

---

## Ejercicio 22: Usar aria-hidden correctamente

Identifica usos incorrectos de `aria-hidden` y corrígelos.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 22</title>
</head>
<body>
  <!-- Problema 1: Botón importante oculto -->
  <button aria-hidden="true">Enviar Formulario</button>
  
  <!-- Problema 2: Contenido duplicado sin ocultar icono -->
  <a href="/perfil">
    <img src="user-icon.svg" alt="Perfil de usuario">
    <span>Perfil de usuario</span>
  </a>
  
  <!-- Correcto: Icono decorativo -->
  <button>
    Guardar
    <svg aria-hidden="true"><!-- Icono --></svg>
  </button>
  
  <!-- Problema 3: Input oculto de lectores pero visible -->
  <div>
    <label>Búsqueda</label>
    <input type="search" aria-hidden="true">
  </div>
</body>
</html>
```

---

## Ejercicio 23: Modal completamente accesible

Implementa un modal que cumpla todos los requisitos de accesibilidad.

**Código inicial:**

```jsx
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Abrir Modal
      </button>
      
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div 
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px'
            }}
          >
            <h2>Título del Modal</h2>
            <p>Contenido del modal</p>
            <button onClick={() => setIsOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
```

**Explicación**
- Añadir `role="dialog"` y `aria-modal="true"`
- Añadir `aria-labelledby` apuntando al título
- Implementar trampa de foco (focus trap)
- Cerrar con ESC
- Restaurar foco al abrir/cerrar
- Prevenir scroll del body cuando está abierto

---

## Ejercicio 24: Skip link funcional

Implementa un skip link que permita saltar la navegación.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 24</title>
  <style>
    nav {
      background: #333;
      padding: 15px;
    }
    
    nav a {
      color: white;
      margin-right: 20px;
      text-decoration: none;
    }
    
    main {
      padding: 20px;
    }
  </style>
</head>
<body>
  <nav>
    <a href="/">Inicio</a>
    <a href="/about">Nosotros</a>
    <a href="/services">Servicios</a>
    <a href="/portfolio">Portfolio</a>
    <a href="/blog">Blog</a>
    <a href="/contact">Contacto</a>
  </nav>
  
  <main>
    <h1>Contenido Principal</h1>
    <p>Aquí va el contenido importante...</p>
  </main>
</body>
</html>
```

**Explicación**
- Añadir skip link antes de la navegación
- Hacer que sea visible al recibir foco
- Que salte al contenido principal (`<main>`)

---

## Ejercicio 25: Input con ayuda contextual

Asocia descripciones de ayuda a inputs usando `aria-describedby`.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 25</title>
</head>
<body>
  <form>
    <div>
      <label for="password">Contraseña</label>
      <input id="password" type="password">
      <p>Debe tener al menos 8 caracteres, una mayúscula y un número</p>
    </div>
    
    <div>
      <label for="username">Nombre de usuario</label>
      <input id="username" type="text">
      <p>Solo letras, números y guiones. Entre 3 y 20 caracteres.</p>
    </div>
    
    <div>
      <label for="email">Email</label>
      <input id="email" type="email">
      <p>Usaremos este email para recuperación de cuenta</p>
    </div>
    
    <button type="submit">Registrarse</button>
  </form>
</body>
</html>
```

---

## Ejercicio 26: Anunciar cambios dinámicos en React

Crea un componente de búsqueda que anuncie los resultados.

**Código inicial:**

```jsx
import { useState } from 'react';

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const mockData = [
    { id: 1, name: 'JavaScript' },
    { id: 2, name: 'TypeScript' },
    { id: 3, name: 'Python' },
    { id: 4, name: 'Java' },
    { id: 5, name: 'C++' }
  ];
  
  const handleSearch = (value) => {
    setQuery(value);
    const filtered = mockData.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };
  
  return (
    <div>
      <label htmlFor="search">Buscar lenguaje</label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchComponent;
```

**Explicación**
- Usar `aria-live="polite"` y `aria-atomic="true"`
- Anunciar cuando no hay resultados
- Bonus: Añadir `role="status"` para el contador

---

## Ejercicio 27: Navegación solo con teclado

Prueba esta página usando solo el teclado e identifica problemas.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 27</title>
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
    }
    
    .dropdown-content {
      display: none;
      position: absolute;
      background: #f9f9f9;
      min-width: 160px;
      box-shadow: 0 8px 16px rgba(0,0,0,0.2);
    }
    
    .dropdown:hover .dropdown-content {
      display: block;
    }
    
    .dropdown-content a {
      display: block;
      padding: 12px 16px;
      text-decoration: none;
      color: black;
    }
  </style>
</head>
<body>
  <div class="dropdown">
    <span>Menú ▼</span>
    <div class="dropdown-content">
      <a href="#option1">Opción 1</a>
      <a href="#option2">Opción 2</a>
      <a href="#option3">Opción 3</a>
    </div>
  </div>
  
  <div style="margin-top: 50px;">
    <p onclick="alert('Clicked!')">Haz click aquí</p>
  </div>
  
  <img 
    src="button.png" 
    onclick="alert('Image clicked')"
    style="cursor: pointer;"
  >
</body>
</html>
```

**Problemas a encontrar y corregir:**
1. Dropdown solo funciona con hover
2. `<span>` no es accesible con teclado
3. `<p>` clickeable no es tabulable
4. Imagen clickeable no es accesible

**Objetivo:**
- Hacer todo operable con teclado
- Usar elementos semánticos apropiados
- Añadir roles ARIA si es necesario

---

## Ejercicio 28: Menú de navegación responsive accesible

Crea un menú hamburguesa accesible para móviles.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio 28</title>
  <style>
    .menu-toggle {
      display: none;
    }
    
    @media (max-width: 768px) {
      .menu-toggle {
        display: block;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
      }
      
      .nav-menu {
        display: none;
      }
      
      .nav-menu.active {
        display: block;
      }
    }
    
    .nav-menu a {
      display: block;
      padding: 10px;
      color: #333;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <header>
    <div class="menu-toggle" onclick="toggleMenu()">☰</div>
    
    <nav class="nav-menu" id="navMenu">
      <a href="/">Inicio</a>
      <a href="/about">Nosotros</a>
      <a href="/services">Servicios</a>
      <a href="/contact">Contacto</a>
    </nav>
  </header>
  
  <script>
    function toggleMenu() {
      document.getElementById('navMenu').classList.toggle('active');
    }
  </script>
</body>
</html>
```

**Explicación**
- Convertir `<div>` del toggle en `<button>`
- Añadir `aria-label` al botón
- Añadir `aria-expanded` que refleje el estado
- Añadir `aria-controls` apuntando al menú
- Implementar cierre con ESC

---

## Ejercicio 29: Formulario de pago accesible

Mejora la accesibilidad de un formulario de pago con tarjeta.

**Código inicial:**

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio 29</title>
</head>
<body>
  <h1>Información de Pago</h1>
  
  <form>
    <div>
      <input type="text" placeholder="Número de tarjeta">
    </div>
    
    <div>
      <input type="text" placeholder="MM/YY" style="width: 80px;">
      <input type="text" placeholder="CVV" style="width: 60px;">
    </div>
    
    <div>
      <input type="text" placeholder="Nombre en la tarjeta">
    </div>
    
    <div>
      <label>
        <input type="checkbox">
        Guardar para próximas compras
      </label>
    </div>
    
    <button type="submit">Pagar $99.00</button>
  </form>
</body>
</html>
```

**Explicación**
- Añadir labels visibles a todos los inputs
- Usar `autocomplete` apropiado (cc-number, cc-exp, cc-csc, cc-name)
- Agrupar fecha y CVV con fieldset
- Añadir ayuda sobre formato de fecha
- Indicar campos requeridos
- Añadir validación accesible

---

## Ejercicio 30: Auditoría completa de sitio

Corrige TODOS los problemas de accesibilidad en este sitio completo.

**Código inicial:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>TechStore - Tu tienda de tecnología</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial; }
    
    header { background: #222; color: #888; padding: 20px; }
    
    .hero { 
      background: url('hero.jpg'); 
      height: 400px; 
      display: flex; 
      align-items: center; 
      justify-content: center;
      color: #ccc;
    }
    
    .products { display: flex; gap: 20px; padding: 20px; }
    
    .product-card {
      border: 1px solid #ddd;
      padding: 15px;
      cursor: pointer;
    }
    
    .btn {
      background: #FFD700;
      color: #FFF;
      padding: 10px 20px;
      cursor: pointer;
      display: inline-block;
    }
    
    footer { background: #333; color: #666; padding: 20px; }
  </style>
</head>
<body>
  <div style="font-size: 20px; color: white; background: #222; padding: 20px;">
    TechStore
  </div>
  
  <div class="hero">
    <div>
      <h3>Las mejores ofertas</h3>
      <div class="btn" onclick="location.href='/ofertas'">Ver ofertas</div>
    </div>
  </div>
  
  <div style="padding: 20px;">
    <h4>Productos destacados</h4>
    
    <div class="products">
      <div class="product-card" onclick="location.href='/laptop'">
        <img src="laptop.jpg" width="200">
        <h2>Laptop Pro</h2>
        <p style="color: #28a745;">$999</p>
        <div class="btn">Comprar</div>
      </div>
      
      <div class="product-card" onclick="location.href='/phone'">
        <img src="phone.jpg">
        <h2>Smartphone X</h2>
        <p style="color: #28a745;">$699</p>
        <a href="/phone">Más info</a>
      </div>
    </div>
  </div>
  
  <form style="padding: 20px; background: #f5f5f5;">
    <h4>Newsletter</h4>
    <input type="email" placeholder="Tu email">
    <div class="btn" onclick="alert('Suscrito!')">Suscribirse</div>
  </form>
  
  <div style="background: #333; color: #666; padding: 20px;">
    <p>© 2026 TechStore</p>
    <a href="/privacy" style="color: #888;">Política de privacidad</a>
  </div>
  
  <div style="position: fixed; bottom: 20px; right: 20px; cursor: pointer;" onclick="scrollToTop()">
    ⬆
  </div>
  
  <script>
    function scrollToTop() {
      window.scrollTo(0, 0);
    }
  </script>
</body>
</html>
```
