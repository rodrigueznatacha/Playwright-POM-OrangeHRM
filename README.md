# 🎭 Playwright & TypeScript: Enterprise E2E Framework
### Automation Showcase - OrangeHRM Open Source Demo

[![Playwright Tests](https://github.com/rodrigueznatacha/Playwright-POM-OrangeHRM/actions/workflows/playwright.yml/badge.svg)](https://github.com/rodrigueznatacha/Playwright-POM-OrangeHRM/actions/workflows/playwright.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Playwright](https://img.shields.io/badge/Playwright-1.58-green.svg)](https://playwright.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-orange.svg)](https://pnpm.io/)

Este proyecto es un framework de automatización **End-to-End (E2E)** de nivel profesional. Utiliza una arquitectura robusta para validar flujos complejos en la plataforma **OrangeHRM**, demostrando habilidades avanzadas en diseño de software para testing, manejo de asincronismo y CI/CD.

---

## 🚀 Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Playwright** | Motor de automatización de última generación. |
| **TypeScript** | Tipado fuerte para un código mantenible y libre de errores. |
| **pnpm** | Gestión de dependencias eficiente y rápida. |
| **GitHub Actions** | Pipeline de Integración Continua (CI). |
| **Faker.js** | Generación de datos de prueba dinámicos y realistas. |

---

## 🏗️ Arquitectura del Framework

El proyecto implementa el patrón **Page Object Model (POM)** avanzado, estructurado de la siguiente manera:

* **`SuperPage.ts`**: Clase base que centraliza localizadores comunes, utilidades de UI y lógica de autenticación heredable.
* **`TestBase.ts`**: Configuración de fixtures personalizadas para una inyección de dependencias limpia en los tests.
* **Locators Inteligentes**: Uso de `getByPlaceholder`, `getByRole` y selectores CSS optimizados para aplicaciones modernas con componentes dinámicos.

---

## 🛡️ Resiliencia y Solución de Desafíos (Senior Insights)

Durante el desarrollo, se aplicaron estrategias críticas para garantizar la estabilidad de los tests en entornos de CI:

### 1. Manejo de Flakiness (Tests Intermitentes)
* **Sincronización Avanzada**: Se reemplazaron esperas genéricas por validaciones de estado como `toBeVisible()` en componentes clave (tablas, formularios) antes de ejecutar aserciones de URL.
* **Aserciones Flexibles**: Uso de **Regex** en `toHaveURL` para permitir latencias en redirecciones de servidor sin romper el flujo.

### 2. Optimización de Infraestructura
* **CI/CD con pnpm**: Configuración del workflow de GitHub para usar `pnpm`, reduciendo el tiempo de instalación de dependencias.
* **Headless Testing**: Ejecución optimizada en segundo plano para máxima velocidad en el pipeline.

---

## 📊 Ejecución y Reportes

### Local
1.  **Instalar dependencias**: `pnpm install`.
2.  **Ejecutar tests**: `pnpm exec playwright test`.
3.  **Ver reporte**: `npx playwright show-report`.

### CI/CD (GitHub Actions)
El framework está configurado para:
* Ejecutarse automáticamente en cada `push` a `main`.
* Capturar **Traces** y **Screenshots** automáticamente solo en caso de fallo para facilitar el debugging.

---

## 📂 Estructura del Proyecto
```text
├── .github/workflows/   # Definición del Pipeline CI/CD
├── tests/
│   ├── e2e/             # Casos de prueba funcionales
│   ├── pages/           # Page Objects (POM)
│   └── data/            # Gestión de datos y credenciales
├── playwright.config.ts # Configuración global del motor
└── pnpm-lock.yaml       # Control de versiones de dependencias
