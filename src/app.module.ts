import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './admin/admin.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: '',
			port: 3306,
			username: 'root',
			password: '',
			database: 'mawedy',
			entities: [],
			synchronize: true,
		}),
		AdminModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
