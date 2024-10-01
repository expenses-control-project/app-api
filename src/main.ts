import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {PORT} from './config/configFile';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';
import {CorsOptions} from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	const corsOptions: CorsOptions = {
		origin: ['http://localhost:5173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	};

	app.enableCors(corsOptions);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
		}),
	);

	const config = new DocumentBuilder()
		.setTitle('Expenses-control')
		.setDescription('Documentacion de la API Expenses-control')
		.setVersion('1.0.0')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(PORT);
}
bootstrap();
