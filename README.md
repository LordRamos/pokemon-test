# Pokemon Test

## Backend

### Instalar dependencias

Proyecto desarrollado en Python 3.8 y Sqlite3.

Crear un environment con el gestor de su preferencia, luego situarse en el directorio `pokemon-api` y ejecutar:

```
pip install requirements.txt
```

### Inicializar BD y correr proyecto

Con el enviroment activo situarse en el directorio `pokemon-api`

Exportar la variable de entorno:

```
export FLASK_APP="entrypoint:app
```

Luego para inicializar BD y migraciones:

```
flask db init
flask db migrate -m "Initial_db"
flask db upgrade
```

Posteriormente para correr el proyecto:

```
python entrypoint.py
```

La api correra en la url `http://localhost:5000/api/v1/`

### Importación CSV Pokemon

En consola y con el environment activo, situarse en el directorio `pokemon-api` y ejecutar:

```
python entrypoint.py csv_import path/de/tu_archivo.csv
```

### End Points

Para autenticación:

```
POST http://localhost:5000/api/v1/auth/login?username=pokemon&password=pokemon2021
```

Para todos los demás endpoints debe poseer el `access_token` generado en el paso anterior y enviarlo en la autorización `Bearer aquitodosutoken`

Obtener lista de pokemon:

```
GET http://localhost:5000/api/v1/pokemon
```

Este endpoint recibe parametros adicionales para busquedas y ordernamiento, puede usar cualquiera de los siguientes atributos:
| Atributo | Tipo de dato |
| ------------- | ------------- |
| id | int |
| number | int |
| type1 | str |
| type2 | str |
| total | int |
| hp | int |
| attack | int |
| defense | int |
| sp_atk | int |
| sp_def | int |
| speed | int |
| generation | int |
| legendary | bool |

Ejemplo:

```
GET http://localhost:5000/api/v1/pokemon?type1=Fire&lengendary=true
```

Para ordernar existen dos parametros, `sort_by` el cual hace referencia al atributo del modelo y `order` que puede ser `asc` o `desc`.
Ejemplo:

```
GET http://localhost:5000/api/v1/pokemon?sort_by=number&order=asc
```

Puede combinar filtros y ordenamiento:

```
GET http://localhost:5000/api/v1/pokemon?sort_by=number&order=asc&type1=Fire&lengendary=true
```

Para agregar un nuevo pokemon:

```
POST http://localhost:5000/api/v1/pokemon
```

Para editar un pokemon:

```
PUT http://localhost:5000/api/v1/pokemon/id
```

Para obtener un pokemon:

```
GET http://localhost:5000/api/v1/pokemon/id
```

Para eliminar un pokemon:

```
DELETE PUT http://localhost:5000/api/v1/pokemon/id
```

## Frontend

Proyecto desarrollado en Node >= 12, Angular >=12

### Instalar dependencias

Situarse en el directorio `ng-app` y luego ejecutar:

```
npm install
```

### Correr proyecto

Situados en el directorio `ng-app` ejecutar:

```
npm run start
```

Abrir la url `http://localhost:4200/` en el navegador.
En el login ingrese el usuario y clave de prueba

```
Usuario: pokemon
Clave: pokemon2021
```
