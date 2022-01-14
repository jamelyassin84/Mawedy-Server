import { Roles } from './modules/roles/roles.entity'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AdminModule } from './modules/admins/admin.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolesModule } from './modules/roles/roles.module'
import { Connection } from 'typeorm'
import { Admin } from './modules/admins/admin.entity'
import { MawedyImagesModule } from './modules/mawedy-images/mawedy-images.module'
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forFeature([]),
		TypeOrmModule.forRoot({
			type: 'mysql',
			host: 'localhost',
			port: 3306,
			username: 'root',
			password: '',
			database: 'mawedy',
			entities: [Admin, Roles],
			synchronize: true,
		}),
		AdminModule,
		RolesModule,
		MawedyImagesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
