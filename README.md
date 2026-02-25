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
* **Loc
