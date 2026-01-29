# Accesibilidad Web

## Índice

1. [Fundamentos de accesibilidad Web](#1-fundamentos)
2. [HTML semántico y ARIA](#2-html-semántico-y-aria)
3. [Formularios accesibles](#3-formularios-accesibles)
4. [Navegación y teclado](#4-navegación-y-teclado)
5. [Contenido dinámico](#5-contenido-dinámico)
6. [Componentes complejos](#6-componentes-complejos)
7. [Testing y herramientas](#7-testing-y-herramientas)

---

## 1. Fundamentos

### 1.1 ¿Qué es la accesibilidad web?

La accesibilidad web significa que personas con discapacidades pueden usar la web. Específicamente, que pueden percibir, entender, navegar e interactuar con sitios web.

**Tipos de diversidad funcional**
- **Visual:** Ceguera, baja visión, daltonismo
- **Auditiva:** Sordera, pérdida auditiva
- **Motora:** Dificultad para usar mouse, temblores
- **Cognitiva:** Dislexia, TDAH, autismo

### 1.2 WCAG (Web Content Accessibility Guidelines)

Las WCAG definen criterios de accesibilidad en 3 niveles:
- **Nivel A:** Básico
- **Nivel AA:** Aceptable (objetivo común)
- **Nivel AAA:** Óptimo

# 🟢 Cheat Sheet WCAG: Niveles de accesibilidad

| Nivel | Descripción | Requisitos clave / Qué revisar |
|-------|------------|-------------------------------|
| **A (Mínimo)** | Básico, esencial para que la web sea mínimamente accesible | - Todas las imágenes tienen `alt` (aunque sea genérico) <br> - Links claros e identificables <br> - Elementos interactivos accesibles con teclado <br> - No dependas solo del color para transmitir información |
| **AA (Recomendado / Estándar)** | Accesible para la mayoría de personas con discapacidad. Nivel **legal en muchos países** | - Contraste de texto mínimo **4.5:1** (texto normal) <br> - Formularios con labels claros y errores descriptivos <br> - Encabezados jerárquicos correctos (`h1` → `h6`) <br> - Texto escalable hasta **200%** sin pérdida de contenido <br> - Elementos interactivos con foco visible <br> - Evitar contenido que parpadee o cause epilepsia |
| **AAA (Óptimo / Alto estándar)** | Nivel muy alto, no siempre aplicable a todo contenido | - Contraste de texto mínimo **7:1** <br> - Subtítulos para todos los vídeos y audio alternativo <br> - Texto fácil de leer / simplificado <br> - Varias alternativas para medios complejos <br> - Mejora de navegación avanzada (atajos de teclado, skip links) |

---

## 🔹 Tips rápidos para testeo
- Prioriza **AA**, es el estándar legal en la mayoría de países.  
- Usa **herramientas automáticas** como axe o WAVE para detectar errores A y AA.  
- Complementa con **tests manuales** (lector de pantalla, teclado, zoom, etc.) para cubrir AAA.  
- Para **SPA o apps dinámicas**, siempre verifica que los elementos carguen antes del test.  

---

**Principios POUR:**
- **Perceptible:** La información debe ser presentable a los usuarios de formas perceptibles
- **Operable:** Los componentes de UI deben ser operables
- **Comprensible:** La información y operación de la UI debe ser comprensible
- **Robusto:** El contenido debe ser interpretable por tecnologías asistivas

### 1.3 Tecnologías Asistivas

- **Lectores de pantalla:** NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS), TalkBack (Android)
- **Magnificadores de pantalla:** ZoomText
- **Navegación por voz:** Dragon NaturallySpeaking
- **Dispositivos alternativos:** Switch controls, eye trackers

---

## 2. HTML semántico y ARIA

### 2.1 HTML semántico antes que ARIA

**Primera regla de ARIA:** No uses ARIA si existe un elemento HTML nativo que haga lo mismo.

```html
<!-- ✅ CORRECTO: HTML nativo -->
<button type="button">Enviar</button>

<!-- ❌ INCORRECTO: Div con ARIA cuando existe <button> -->
<div role="button" tabindex="0" onclick="submit()">Enviar</div>
```

**¿Por qué?** Los elementos nativos tienen:
- Comportamiento de teclado incorporado
- Roles implícitos
- Estados y propiedades automáticas
- Mejor compatibilidad con navegadores

### 2.2 Roles ARIA

Los roles definen el tipo de elemento para tecnologías asistivas.

```html
<!-- Navegación -->
<nav role="navigation">
  <ul>
    <li><a href="/">Inicio</a></li>
  </ul>
</nav>

<!-- Región principal -->
<main role="main">
  <h1>Contenido principal</h1>
</main>

<!-- Información complementaria -->
<aside role="complementary">
  <h2>Artículos relacionados</h2>
</aside>

<!-- Banner (cabecera del sitio) -->
<header role="banner">
  <h1>Mi Sitio</h1>
</header>

<!-- Información del sitio (pie de página) -->
<footer role="contentinfo">
  <p>&copy; 2026</p>
</footer>
```

### 2.3 `aria-label` y `aria-labelledby`

Proporcionan nombres accesibles a elementos.

**`aria-label`:** Texto directo

```html
<!-- Botón con solo icono -->
<button aria-label="Cerrar modal">
  <svg><!-- X icon --></svg>
</button>

<!-- Enlace a redes sociales -->
<a href="https://twitter.com/usuario" aria-label="Síguenos en X">
  <svg><!-- X icon --></svg>
</a>

<!-- Búsqueda -->
<button aria-label="Buscar">
  <svg><!-- Lupa --></svg>
</button>
```

**`aria-labelledby`:** Referencia a otro elemento por ID

```html
<h2 id="section-title">Configuración de privacidad</h2>
<section aria-labelledby="section-title">
  <!-- Contenido -->
</section>

<!-- Modal -->
<div role="dialog" aria-labelledby="modal-title">
  <h2 id="modal-title">Confirmar eliminación</h2>
  <p>¿Estás segura?</p>
</div>
```

### 2.4 `aria-describedby`

Proporciona descripción adicional.

```html
<label for="password">Contraseña</label>
<input 
  id="password" 
  type="password"
  aria-describedby="password-requirements"
/>
<p id="password-requirements">
  Mínimo 8 caracteres, una mayúscula y un número
</p>
```

### 2.5 `aria-hidden`

Oculta elementos de tecnologías asistivas (pero se ven visualmente).

```html
<!-- Iconos decorativos -->
<button>
  Guardar
  <svg aria-hidden="true"><!-- Icono --></svg>
</button>

<!-- Duplicados visuales -->
<a href="/perfil">
  <img src="avatar.jpg" alt="Juan Pérez">
  <span aria-hidden="true">Juan Pérez</span>
</a>

```

**⚠️ Cuidado:** No ocultes contenido interactivo o importante.

### 2.6 Estados con `aria-expanded`, `aria-pressed`, `aria-checked`

```html
<!-- Menú desplegable -->
<button 
  aria-expanded="false"
  aria-controls="menu-dropdown"
>
  Menú
</button>
<ul id="menu-dropdown" hidden>
  <li><a href="/perfil">Perfil</a></li>
</ul>

<!-- Botón toggle -->
<button 
  aria-pressed="false"
  onclick="this.setAttribute('aria-pressed', 
    this.getAttribute('aria-pressed') === 'false')"
>
  Modo oscuro
</button>

<!-- Checkbox personalizado -->
<div role="checkbox" aria-checked="false" tabindex="0">
  Acepto términos
</div>
```

---

## 3. Formularios accesibles

### 3.1 Labels siempre visibles

```html

<!-- ✅ CORRECTO -->
<label for="email">Correo electrónico</label>
<input id="email" type="email" name="email" />

<!-- ❌ INCORRECTO: Solo placeholder -->
<input type="email" placeholder="Email" />
```

**¿Por qué?** 
- El placeholder desaparece al escribir
- Tiene bajo contraste
- Lectores de pantalla pueden no anunciarlo

### 3.2 Agrupación con `<fieldset>` y `<legend>`

```html
<fieldset>
  <legend>Información de contacto</legend>
  
  <label for="phone">Teléfono</label>
  <input id="phone" type="tel" />
  
  <label for="email2">Email</label>
  <input id="email2" type="email" />
</fieldset>

<fieldset>
  <legend>¿Cómo prefieres que te contactemos?</legend>
  
  <label>
    <input type="radio" name="contact" value="email" />
    Email
  </label>
  
  <label>
    <input type="radio" name="contact" value="phone" />
    Teléfono
  </label>
</fieldset>
```

### 3.3 Mensajes de error accesibles

```html
<form>
  <label for="username">Usuario</label>
  <input 
    id="username"
    type="text"
    aria-invalid="true"
    aria-describedby="username-error"
  />
  <p id="username-error" role="alert">
    El usuario debe tener al menos 3 caracteres
  </p>
</form>
```

**En React:**

```jsx
function FormField({ error }) {
  const errorId = error ? 'email-error' : undefined;
  
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        aria-invalid={!!error}
        aria-describedby={errorId}
      />
      {error && (
        <p id="email-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

### 3.4 Inputs requeridos

```html
<!-- Opción 1: HTML5 -->
<label for="name">Nombre *</label>
<input id="name" type="text" required />

<!-- Opción 2: ARIA -->
<label for="name2">Nombre *</label>
<input id="name2" type="text" aria-required="true" />
```

### 3.5 Autocompletado

```html
<label for="cc-number">Número de tarjeta</label>
<input 
  id="cc-number"
  type="text"
  autocomplete="cc-number"
/>

<label for="country">País</label>
<input 
  id="country"
  type="text"
  autocomplete="country-name"
/>
```

---

## 4. Navegación y teclado

### 4.1 Orden lógico de tabulación

El orden debe seguir el flujo visual. **Evita `tabindex` positivos.**

```html
<!-- ✅ CORRECTO: Orden natural -->
<button>Primero</button>
<button>Segundo</button>
<button>Tercero</button>

<!-- ❌ INCORRECTO: tabindex positivo -->
<button tabindex="3">Tercero</button>
<button tabindex="1">Primero</button>
<button tabindex="2">Segundo</button>
```

### 4.2 `tabindex="-1"` para foco programático

```html
<div id="modal" tabindex="-1">
  <h2>Modal</h2>
  <button>Cerrar</button>
</div>

<script>
// Mover foco al abrir modal
document.getElementById('modal').focus();
</script>

```

### 4.3 Foco visible

```css
/* Navegadores modernos */
:focus-visible {
  outline: 3px solid #0066cc;
  outline-offset: 2px;
}

/* Eliminar outline solo cuando no es teclado */
:focus:not(:focus-visible) {
  outline: none;
}

/* Personalizado por componente */
button:focus-visible {
  outline: 3px solid #ff6b6b;
  box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.2);
}
```

### 4.4 Skip links

Permiten saltar bloques de contenido repetitivo.

```html
<body>
  <a href="#main-content" class="skip-link">
    Saltar al contenido principal
  </a>
  
  <nav><!-- Navegación --></nav>
  
  <main id="main-content">
    <h1>Contenido</h1>
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px;
  background: #000;
  color: #fff;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### 4.5 Navegación por teclado en componentes personalizados

```jsx
function Dropdown({ items }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  
  const handleKeyDown = (e) => {
    switch(e.key) {
      case 'Enter':
      case ' ':
        setOpen(!open);
        break;
      case 'Escape':
        setOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelected(prev => 
          prev < items.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelected(prev => prev > 0 ? prev - 1 : prev);
        break;
    }
  };
  
  return (
    <div>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        onKeyDown={handleKeyDown}
      >
        Seleccionar
      </button>
      {open && (
        <ul role="listbox">
          {items.map((item, i) => (
            <li
              key={item.id}
              role="option"
              aria-selected={i === selected}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 5. Contenido dinámico

### 5.1 `aria-live` para anuncios

**`aria-live="polite"`:** Anuncia cuando el usuario termina su acción actual

```html
<div aria-live="polite">
  <p>Guardado exitosamente</p>
</div>
```

**`aria-live="assertive"`:** Anuncia inmediatamente (solo para urgente)

```html
<div aria-live="assertive">
  <p>❌ Error: No se pudo conectar al servidor</p>
</div>
```

**`aria-live="off"`:** No anuncia (default)

### 5.2 `role="status"` y `role="alert"`

```html
<!-- Equivalente a aria-live="polite" -->
<div role="status">
  Cargando resultados...
</div>

<!-- Equivalente a aria-live="assertive" -->
<div role="alert">
  ⚠️ Sesión a punto de expirar
</div>
```

### 5.3 Regiones vivas en React

```jsx
function SearchResults({ results, loading }) {
  return (
    <div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {loading ? 'Buscando...' : `${results.length} resultados encontrados`}
      </div>
      
      <ul>
        {results.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 5.4 `aria-atomic`

Indica si se debe anunciar toda la región o solo lo que cambió.

```html
<!-- Anuncia solo el cambio -->
<div aria-live="polite" aria-atomic="false">
  <p>Paso 1: Completo ✓</p>
  <p>Paso 2: En progreso...</p>
</div>

<!-- Anuncia todo el contenido -->
<div aria-live="polite" aria-atomic="true">
  3 de 10 archivos subidos
</div>
```

---

## 6. Componentes complejos

### 6.1 Modal/Dialog accesible

```jsx
function Modal({ isOpen, onClose, title, children }) {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      // Guardar elemento con foco anterior
      previousFocus.current = document.activeElement;
      
      // Mover foco al modal
      modalRef.current?.focus();
      
      // Prevenir scroll del body
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restaurar foco
        previousFocus.current?.focus();
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);
  
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onClick={e => e.stopPropagation()}
      >
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
```

### 6.2 Tabs accesibles

```jsx
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);
  
  const handleKeyDown = (e, index) => {
    let newIndex = index;
    
    switch(e.key) {
      case 'ArrowRight':
        newIndex = index < tabs.length - 1 ? index + 1 : 0;
        break;
      case 'ArrowLeft':
        newIndex = index > 0 ? index - 1 : tabs.length - 1;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    e.preventDefault();
    setActiveTab(newIndex);
    document.getElementById(`tab-${newIndex}`)?.focus();
  };
  
  return (
    <div>
      <div role="tablist" aria-label="Secciones">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            id={`tab-${i}`}
            role="tab"
            aria-selected={i === activeTab}
            aria-controls={`panel-${i}`}
            tabIndex={i === activeTab ? 0 : -1}
            onClick={() => setActiveTab(i)}
            onKeyDown={e => handleKeyDown(e, i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab, i) => (
        <div
          key={tab.id}
          id={`panel-${i}`}
          role="tabpanel"
          aria-labelledby={`tab-${i}`}
          hidden={i !== activeTab}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

### 6.3 Carrusel accesible

```jsx
function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);
  
  return (
    <section aria-label="Carrusel de proyectos">
      {/* Región viva para anunciar cambios */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className="sr-only"
      >
        Slide {current + 1} de {slides.length}: {slides[current].title}
      </div>
      
      {/* Controles */}
      <div>
        <button
          onClick={() => setCurrent(prev => 
            prev > 0 ? prev - 1 : slides.length - 1
          )}
          aria-label="Slide anterior"
        >
          ←
        </button>
        
        <button
          onClick={() => setAutoplay(!autoplay)}
          aria-label={autoplay ? 'Pausar carrusel' : 'Reanudar carrusel'}
        >
          {autoplay ? '⏸' : '▶'}
        </button>
        
        <button
          onClick={() => setCurrent(prev => (prev + 1) % slides.length)}
          aria-label="Siguiente slide"
        >
          →
        </button>
      </div>
      
      {/* Contenido */}
      <div>
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            hidden={i !== current}
            aria-hidden={i !== current}
          >
            <img src={slide.image} alt={slide.alt} />
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
      
      {/* Indicadores */}
      <div role="group" aria-label="Indicadores de slides">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}: ${slide.title}`}
            aria-current={i === current}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
```

### 6.4 Tooltip accesible

```jsx
function Tooltip({ text, children }) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  
  return (
    <span style={{ position: 'relative' }}>
      <span
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        aria-describedby={visible ? id : undefined}
      >
        {children}
      </span>
      
      {visible && (
        <span
          id={id}
          role="tooltip"
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}
```

---

## 7. Testing y Herramientas

### 7.1 Testing con teclado

**Checklist:**
- [ ] ¿Se puede alcanzar todo con Tab?
- [ ] ¿El orden de tabulación es lógico?
- [ ] ¿El foco es visible?
- [ ] ¿Enter/Espacio activan botones?
- [ ] ¿ESC cierra modales?
- [ ] ¿Flechas navegan en listas/menús?

### 7.2 Testing con lectores de pantalla

**NVDA (Windows - Gratis):**
- NVDA + Flecha abajo: Leer siguiente elemento
- NVDA + Espacio: Modo foco/navegación
- NVDA + F7: Lista de elementos
- H: Siguiente encabezado
- K: Siguiente enlace
- F: Siguiente formulario

**VoiceOver (macOS):**
- Cmd + F5: Activar/desactivar
- VO + Flecha derecha: Siguiente elemento
- VO + U: Rotor
- VO + Cmd + H: Siguiente encabezado

### 7.3 Extensiones de navegador

**axe DevTools:**
1. Instalar extensión
2. Abrir DevTools → pestaña axe
3. Click "Scan ALL of my page"
4. Revisar issues por categoría

**WAVE:**
1. Instalar extensión
2. Click en icono WAVE
3. Revisar errores (rojo), alertas (amarillo)

**Lighthouse:**
1. DevTools → Lighthouse
2. Seleccionar "Accessibility"
3. Generate report
4. Revisar score y oportunidades

### 7.4 Herramientas de contraste

**WebAIM Contrast Checker:**
- https://webaim.org/resources/contrastchecker/

**Ratios mínimos:**
- Texto normal: 4.5:1 (AA)
- Texto grande (18pt+ o 14pt+ negrita): 3:1 (AA)
- Componentes UI: 3:1 (AA)

### 7.5 Checklist de accesibilidad

**Semántica:**
- [ ] HTML semántico antes que ARIA
- [ ] Jerarquía correcta de headings (h1 > h2 > h3)
- [ ] Landmarks (nav, main, aside, footer)
- [ ] Idioma del documento (`<html lang="es">`)

**Teclado:**
- [ ] Todo es operable con teclado
- [ ] Foco visible
- [ ] No hay trampas de teclado
- [ ] Skip links presentes

**Formularios:**
- [ ] Labels asociados a inputs
- [ ] Mensajes de error claros
- [ ] Campos requeridos indicados
- [ ] Fieldsets para agrupación

**Contenido:**
- [ ] Alt text en imágenes
- [ ] No solo color para información
- [ ] Contraste suficiente
- [ ] Texto redimensionable

**Dinámico:**
- [ ] Cambios anunciados (aria-live)
- [ ] Estados comunicados (aria-expanded, etc)
- [ ] Foco manejado en SPAs

---

## Recursos adicionales 🤩

**Documentación:**
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

**Cursos:**
- [Web Accessibility by Google (Udacity)](https://www.udacity.com/course/web-accessibility--ud891)
- [Curso de weAAAre](https://www.weaaare.com/home)

**Herramientas:**
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)
