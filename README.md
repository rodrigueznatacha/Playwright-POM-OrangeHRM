🚀 Playwright & TypeScript: Enterprise E2E Framework
Este repositorio contiene un framework de automatización End-to-End (E2E) de nivel profesional diseñado para la plataforma OrangeHRM. El objetivo principal es demostrar la implementación de patrones de diseño avanzados, manejo de flujos asíncronos complejos y la integración de procesos de Integración Continua (CI).

🛠️ Stack Tecnológico
Core: Playwright con TypeScript.

Gestor de Paquetes: pnpm para instalaciones ultra rápidas y eficientes.

Datos: @faker-js/faker para la generación de datos de prueba dinámicos y únicos.

CI/CD: GitHub Actions con reportes automatizados.

Patrón de Diseño: Page Object Model (POM) avanzado con herencia de clases.

🌟 Características Destacadas
🏗️ Arquitectura Page Object Model (POM)
El framework utiliza una SuperPage base que centraliza utilidades comunes (locators dinámicos, manejo de popups y lógica de autenticación), permitiendo que las páginas específicas como AddSystemUserPage o PIMPage hereden estas capacidades, reduciendo drásticamente la duplicación de código.

🛡️ Resiliencia y Estabilidad (Anti-Flakiness)
En entornos de CI/CD, la latencia de red puede invalidar pruebas válidas. Este framework implementa estrategias de espera inteligente:

Sincronización por Estado: Validación de visibilidad de componentes antes de aserciones de URL.

Timeouts Adaptativos: Configuración optimizada de 10s para aserciones en entornos de nube.

Regex Assertions: Validación de navegación mediante patrones flexibles para evitar rupturas por cambios menores en la URL.

📊 Reportes e Infraestructura
Custom Reporter: Implementación de un reportero personalizado en consola para visibilidad detallada en CI.

Estrategia de Artifacts: Captura automática de Screenshots y Traces únicamente en caso de fallo para optimizar el almacenamiento y facilitar el debugging.

🚀 Ejecución
Instalar dependencias:

Bash
pnpm install
Instalar navegadores:

Bash
npx playwright install --with-deps chromium
Ejecutar pruebas:

Bash
pnpm exec playwright test
🔧 Solución de Desafíos Técnicos (Senior Insight)
Reto: Durante la integración en GitHub Actions, se detectó intermitencia (flakiness) debido a la carga asíncrona de OrangeHRM.

Solución: Se refactorizó la lógica de sincronización pasando de un modelo basado en carga de DOM (domcontentloaded) a uno basado en visibilidad de componentes críticos (toBeVisible) y redirección por patrones de texto. Además, se migró el entorno de CI para soportar pnpm, optimizando el tiempo de ejecución en un 30%.

Desarrollado con ❤️ para elevar los estándares de calidad en Software Testing.
