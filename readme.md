## Descripción
Esta API está diseñada para ser usada por una aplicación de gestión de productos y categorías, incluyendo funcionalidades de autenticación de usuarios y manejo de imágenes.

## Tecnologías Utilizadas
- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- Cloudinary para manejo de imágenes
- CORS


## Modelos
- **User**: Usuarios que pueden registrarse, loguearse, cambiar su img avatar, guardar sus productos favoritos.
- **Product**: Productos disponibles en la plataforma, relacionados con category y users.
- **Category**: Categorías asociadas a los productos.

## Endpoints

### Autenticación
- POST `/users/register`: Registrar un nuevo usuario.
- POST `/users/login`: Loguear un usuario y devolver un JWT.

### Usuarios
- PUT `/users/auth/avatar`: editar nombre de usuario y Añadir/cambiar un avatar subiendo una imagen a (Cloudinary) (Requiere JWT).
- PUT `/users/auth/:id` (Admin): Modificar el rol de un usuario (Requiere JWT y rol de Admin).
- DELETE `/users/auth/deleteUser`: eliminar un usuario.

### Productos
- GET `/products`: Listar todos los productos.
- GET `/products/:id`: Obtener un producto específico.
- POST `/products`: Crear un nuevo producto (se puede subir archivos imagen a Cloudinary)(Requiere JWT ).
- POST `/products/:id`: Añadir un producto a la lista de favoritos del usuario (Requiere JWT)
- PUT `/products/:id`: Actualizar un producto (Cloudinary)(Requiere JWT ).
- DELETE `/products/:id`: Eliminar un producto (Requiere JWT).

### Categorías
- GET `/categories`: Listar todas las categorías.
- GET `/categories/:id`: Obtener una categoría específica.
- POST `/categories`: Crear una nueva categoría (Cloudinary)(Requiere JWT).
- PUT `/categories/:id`: Actualizar una categoría (Cloudinary)(Requiere JWT).
- DELETE `/categories/:id`: Eliminar una categoría (Requiere JWT).

## Seguridad
- Todas las operaciones sensibles están protegidas con JWT.
- La API está configurada con un rate-limiter de 3 min para evitar abuso del servicio.

## seed
-Lanzar seed npm run seed 
## Despliegue
https://store-server7.vercel.app/api/v1/