# NOTA IMPORTANTE: 

Al ejecutar $ ng serve , e intentar loguearme por primera vez, a veces no redirije a "home" 
como deberia, y en otras veces si. Supongo que es un bug de mi navegador, o la caché de este.
En dicho caso, se soluciona usando cualquier URL permitida, como: /dashboard/home
Luego de ellos, si se cierra sesion y se vuelve a intentar ingresar re-dirije siempre de forma correcta.

# Logins

Usario con rol administrador:
email: admin@mail.com
password: admin

Usuario con rol profesor:
email: teacher@mail.com
password: teacher

# Cargar contenido de la API

## Luego de ejecutar:

$ng serve

## Ejecutar en otra consola:

$ json-server db.json --watch

# Ejecutar Pruebas Unitarias

$ ng test