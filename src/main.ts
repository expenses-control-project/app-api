import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {PORT} from './config/configFile';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.setGlobalPrefix('api');

	app.enableCors({
		origin: 'https://app-expenses-control.web.app',
		methods: 'GET,PUT,PATCH,POST,DELETE',
		credentials: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);

	const reflector = app.get(Reflector);

	app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

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
