<img src="./logo.png" alt="Project Logo or Image" width="120" height="100" style="margin-bottom: -30px">

# Reto - Frontend NextTs/GraphQL

```
Fecha inicio: 20/01/2025
Fecha fin: 22/01/2025
Fecha respuesta: 25/01/2025
```

#### Conocimientos Requeridos:

- [x] NextJS
- [x] Typescript
- [x] Tailwindcss
- [x] GraphQL

#### Descripción:

Los usuarios cliente podrán ingresar a su portal y cargar productos que se vincularán a sus cuentas. Luego, podrán listar y/o buscar productos donde podrán visualizar el detalle de cada producto.

Este proyecto está conectado a 2 bases de datos **eiAccounts** y **eiInventories**. La lista de productos está relacionada a la cuenta con la que se asoció al momento de la carga inicial.

- El usuario de prueba es prueba@gmail.com (no hay contraseña, el login usará solo un filtro en un listado)
- La api es http://ec2-3-80-133-158.compute-1.amazonaws.com

#### Tareas:

##### A. Cuenta:

- [ ] Login: Agregar una query para buscar la cuenta por email usando el listado de las cuentas enviando parámetros disponibles en el **schema**

##### B. Productos:

- [ ] Agregar una mutación para agregar un array de productos (debe asociarse a una cuenta cliente - ID de cuenta obtenido desde el Login)
- [ ] Agregar una query para listar los productos enviando parámetros de **paginación** y filtrado de búsqueda (nombre/sku)

> Opcional: Se considerará el uso de validaciones en queries y mutaciones (uso de yup con formik) y creaciones de carpetas utils o helpers

#### Mejoras:

```
Según criterio del desarrollador
```

- [ ] Mejorar eslint
- [ ] Agregar prettier
- [ ] Añadir test unitarios
