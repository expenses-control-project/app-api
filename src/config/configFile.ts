import {config} from 'dotenv';

// Carga de las variables de entorno
config();

// Variables de entorno
export const DATABASE_URL = process.env.DATABASE_URL || '';
export const PORT = process.env.PORT || 3002;

// Comprueba que la base de datos esta definida
if (!DATABASE_URL) {
	throw new Error(
		'DATABASE_URL no está definida en las variables de entorno.',
	);
}
