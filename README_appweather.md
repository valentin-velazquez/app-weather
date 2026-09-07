# App de Clima

Aplicación móvil que muestra el clima actual y el pronóstico a partir de la ubicación o ciudad buscada, desarrollada como proyecto de práctica en React Native.

## Tecnologías

- React Native
- WeatherAPI.com (API de datos climáticos)
- Jest (testing)
- EAS Build (generación de APK)

## Arquitectura

El proyecto está organizado siguiendo principios de código limpio, separando responsabilidades en:

- **Services**: manejo de las llamadas a la API de WeatherAPI.com
- **Hooks**: lógica de estado y datos reutilizable
- **Components**: interfaz de usuario

Esta separación facilita el testing y el mantenimiento del código.

## Instalación y uso

```bash
npm install
npx expo start
```

### Generar APK

```bash
eas build -p android
```

## Testing

El proyecto incluye tests con Jest para validar la lógica de la aplicación.

```bash
npm test
```

## Estado del proyecto

Proyecto personal desarrollado como práctica de React Native, aplicando buenas prácticas de organización de código (separación en services/hooks/components) y testing.
