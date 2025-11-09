# 🧩 Prueba Técnica – Desarrollador Frontend Angular

### Empresa: **Software One**

| 👨‍💻 **Autor** | 📅 **Fecha de entrega** | 🧠 **Nivel evaluado** | ⚙️ **Framework** |
| :--- | :--- | :--- | :--- |
| *Alberto Treky* | Noviembre 2025 | Intermedio (2–3 años exp.) | Angular 18 + TypeScript + SCSS + Angular Material |

---

## 🎯 Objetivo

Desarrollar una **aplicación Angular profesional (User Dashboard)** que demuestre dominio técnico sobre arquitectura modular, interceptores HTTP, reactive forms, comunicación entre componentes, gestión de errores, almacenamiento local, principios **SOLID** y **KISS**, además de incluir funcionalidades **PWA**.

El resultado es un **User Dashboard** moderno con autenticación simulada, perfiles editables, preferencias de usuario persistentes, operaciones CRUD con la API pública de JSONPlaceholder, y un entorno completamente estructurado y tipado.

---

## 📋 Requisitos y Cumplimiento

| Requisito | Estado | Archivo / Implementación |
|:---|:---|:---|
| Componentes y Módulos feature-based | ✅ | `features/dashboard`, `features/profile`, `features/settings` |
| Comunicación Input/Output | ✅ | `shared/components/post-item/post-item.component.ts` |
| Services con Observables | ✅ | `theme.service.ts`, `api.service.ts` |
| ViewChild / ViewChildren | ✅ | `profile.component.ts` |
| Lazy Loading (mínimo 2 módulos) | ✅ | `dashboard.routes.ts`, `profile.routes.ts` |
| Preloading Strategy | ✅ | `app.routes.ts` |
| AuthInterceptor | ✅ | `auth.interceptor.ts` |
| ErrorInterceptor | ✅ | `error.interceptor.ts` |
| Change Detection OnPush | ✅ | `dashboard.component.ts`, `post-item.component.ts` |
| ChangeDetectorRef | ✅ | `dashboard.component.ts` |
| trackBy en listas | ✅ | `dashboard.component.ts` |
| Componentes Standalone (2+) | ✅ | `loading-spinner`, `user-card` |
| CRUD API Pública (JSONPlaceholder) | ✅ | `api.service.ts` |
| Loading/Error/Success states | ✅ | `dashboard.component.ts` |
| Paginación o filtrado | ✅ | `dashboard.component.ts` |
| Gestión Cookies / LocalStorage / SessionStorage | ✅ | `storage.service.ts` |
| Reactive Forms + Validaciones Sync/Async | ✅ | `profile.component.ts`, `profile.validators.ts` |
| Validadores personalizados | ✅ | `profile.validators.ts` |
| Manejo user-friendly de errores | ✅ | `profile.component.html` |
| Global ErrorHandler | ✅ | `global-error-handler.ts` |
| Service de Logging | ✅ | `logger.service.ts` |
| Testing unitario (mínimo 2 componentes + 1 servicio) | ✅ | `dashboard.component.spec.ts`, `profile.component.spec.ts`, `api.service.spec.ts` |
| PWA (cache, offline, manifest) | ✅ | `@angular/pwa`, `manifest.webmanifest`, `ngsw-config.json` |
| TypeScript estricto | ✅ | `tsconfig.json` |
| ESLint / Prettier | ✅ | `.eslintrc.json`, `.prettierrc` |

---

## 🧠 Principios SOLID Aplicados

### 🔹 S — *Single Responsibility Principle*
Cada clase tiene una sola responsabilidad:

* `ApiService` → comunicación HTTP.
* `LoggerService` → registro de eventos.
* `StorageService` → gestión de almacenamiento (cookies, local, session).
* `GlobalErrorHandler` → manejo centralizado de errores.
* `DashboardFacade` → separación de lógica de negocio y UI.

**Resultado:** Código desacoplado y fácil de mantener.

---

### 🔹 O — *Open/Closed Principle*
El sistema es extensible sin modificar su comportamiento existente:

* Validadores (`profile.validators.ts`) pueden ampliarse fácilmente.
* `LoggerService` sigue interfaz genérica (`LoggerPort`) para futuras implementaciones.

**Ejemplo:**

export interface LoggerPort { log(level: 'info' | 'warn' | 'error', message: string, context?: string): void; }

### 🔹 L — *Liskov Substitution Principle*

Los servicios y modelos siguen contratos claros (interfaces) que permiten intercambiar implementaciones sin romper dependencias.

* `ApiService` puede reemplazarse por un mock o una API real sin modificar componentes.
* `User`, `Post`, `Todo` implementan tipado fuerte garantizando coherencia de datos.

### 🔹 I — *Interface Segregation Principle*

Se crean interfaces pequeñas y específicas, separadas en `app.models.ts`:

* `Post`, `User`, `Todo`, `AppError`, `UserPreferences`, etc.
* Cada servicio importa únicamente lo que necesita.

### 🔹 D — *Dependency Inversion Principle*

Las dependencias apuntan hacia abstracciones, no implementaciones:

* `GlobalErrorHandler` depende de `LoggerPort`, no directamente de `LoggerService`.
* `DashboardComponent` utiliza `DashboardFacade` (inyectado).

**Resultado:** Esto permite sustituir o ampliar módulos sin romper el sistema.

---

## ✨ Principio KISS (Keep It Simple, Stupid)

El principio KISS se ha aplicado rigurosamente para mantener el código claro, directo y mantenible.

💡 **Ejemplos prácticos:**

* Componentes breves, autocontenidos y legibles.
* Validadores definidos como funciones puras y reutilizables.
* Facades para aislar la lógica de negocio.
* Componentes visuales reutilizables (`alert`, `loading-spinner`).
* Código con nombres expresivos, sin lógica innecesaria.

✅ **Beneficios:**

* Curva de aprendizaje mínima.
* Mantenimiento sencillo y evolutivo.
* Reducción drástica del acoplamiento.
* Claridad total en la arquitectura.

---

## 🛠️ Buenas Prácticas Aplicadas

* Arquitectura **feature-based** + `core`/`shared`/`standalone`.
* Uso de tipado fuerte y centralizado (`app.models.ts`).
* Observables y RxJS para **flujo reactivo** y cancelable.
* `ChangeDetectionStrategy.OnPush` para optimizar **rendimiento**.
* `trackBy` en `ngFor` para mejorar performance.
* `AsyncPipe` para evitar **fugas de memoria**.
* `ErrorHandler` global con logging y manejo HTTP.
* ESLint + Prettier para consistencia.
* SOLID + KISS en todas las capas.

---

## 🛡️ Gestión de Errores y Trazabilidad

| Componente | Función Principal | Resultado |
|:---|:---|:---|
| **`GlobalErrorHandler`** | Centraliza errores de *runtime* globales. | Sistema resiliente ante fallos no atrapados. |
| **`ErrorInterceptor`** | Gestiona respuestas HTTP (4xx, 5xx) mostrando mensajes amigables. | Manejo user-friendly de errores. |
| **`LoggerService`** | Almacena logs con niveles (`info`, `warn`, `error`). | Trazabilidad completa del flujo de la aplicación. |

---

## 🧪 Cobertura y Testing Unitario

Ejecutar: `npm run test`

| Archivo | Tipo | Descripción | Cobertura |
|:---|:---|:---|:---|
| `dashboard.component.spec.ts` | Componente | Test de renderizado + Change Detection (`OnPush`). | ~85% |
| `profile.component.spec.ts` | Componente | Pruebas de **Validaciones Reactivas** y manejo de estados del formulario. | ~82% |
| `api.service.spec.ts` | Servicio | **Mocking HTTP** con `HttpTestingController` para aislamiento total. | ~90% |

> Cobertura total: **~85% líneas** | **80% branches** ✅

---

## 📱 PWA – Progressive Web App

Implementado con: `ng add @angular/pwa`

* `manifest.webmanifest` + `ngsw-config.json`
* **Cache offline** y Service Worker activos.
* Notificación push simulada con MatSnackBar.
* **Modo offline:** Comprobable desde DevTools → Network → Offline.

---

## ⚙️ Instrucciones de Ejecución

### 🔧 Instalación

npm install

### ▶️ Ejecución Local

> **Abrir en:** `http://localhost:4200`

### 🏗️ Compilación y PWA

| Comando | Propósito |
|:---|:---|
| `ng build --configuration production` | Compilación final con optimizaciones de producción. |
| `ng test --code-coverage` | Ejecutar tests y generar el reporte de cobertura. |
| `npx http-server ./dist/user-dashboard -p 8080` | **Simular servidor PWA** para probar el Service Worker. |

---

## 🧭 Decisiones Técnicas

| Decisión | Justificación |
|:---|:---|
| **Facade Pattern** | Limpieza de componentes (**Single Responsibility**). |
| **Modelos centralizados** | *Type Safety* + mantenibilidad. |
| **Standalone Components** | Mejor rendimiento y modularidad. |
| **Interceptors HTTP** | Seguridad y control de errores global. |
| **Logger + ErrorHandler** | Escalabilidad y trazabilidad. |
| **Arquitectura modular** | Facilita *lazy loading* y escalado. |
| **PWA Bonus** | Mejora experiencia offline y UX. |

---

## 📊 Arquitectura

* **Capa Core:** servicios, interceptores, handlers, modelos.
* **Capa Features:** módulos funcionales (Dashboard, Profile, Settings).
* **Capa Shared/Standalone:** componentes reutilizables.
* **Capa Layout:** estructura principal visual.

**Flujo de datos:** `Component` → `Facade` → `Service` → `API` → `Template`

---

## 💡 Conclusión y Visión de Arquitectura

Esta prueba técnica implementa todos los requisitos solicitados, aplicando una arquitectura **profesional, limpia y escalable** en Angular 18.

Demuestra una visión de arquitectura *enterprise*, orientada a **mantenibilidad, testabilidad y rendimiento**, integrando los principios **SOLID** y **KISS**, junto con una capa PWA moderna y funcional.

👤 **Contacto**

| Nombre | Correo Electrónico |
|:---|:---|
| **Alberto Salmerón** | albertosalmerontapia@gmail.com |
