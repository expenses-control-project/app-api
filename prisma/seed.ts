// prisma/seed.ts
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const rubros = [
		{nombreRubro: 'Alimentación y Bebidas'},
		{nombreRubro: 'Moda y Textil'},
		{nombreRubro: 'Tecnología y Electrónica'},
		{nombreRubro: 'Salud y Bienestar'},
		{nombreRubro: 'Construcción e Inmobiliaria'},
		{nombreRubro: 'Transporte y Logística'},
		{nombreRubro: 'Educación y Capacitación'},
		{nombreRubro: 'Automotriz'},
		{nombreRubro: 'Entretenimiento y Ocio'},
		{nombreRubro: 'Turismo y Hotelería'},
	];

	for (const rubro of rubros) {
		await prisma.rubros.upsert({
			where: {nombreRubro: rubro.nombreRubro},
			update: {}, // Si el rubro ya existe, no hace nada
			create: rubro, // Si no existe, crear el rubro
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
