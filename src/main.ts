import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

global.__basedir = __dirname

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	app.setGlobalPrefix('api')

	app.useGlobalPipes(new ValidationPipe())

	app.useGlobalInterceptors(
		new ClassSerializerInterceptor(app.get(Reflector)),
	)

	const config = new DocumentBuilder()
		.setTitle('Mawedy API Documentation')
		.setDescription('Comprehensive API Documentation of Mawedy')
		.setVersion('1.0')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)

	SwaggerModule.setup('/docs', app, document)

	await app.listen(3000)
}
bootstrap()
