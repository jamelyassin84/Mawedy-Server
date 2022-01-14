import { Phone } from './modules/phones/phone.entity'
import { Log } from './modules/logs/log.entity'
import { MawedyImages } from './modules/mawedy-images/mawedy-image.entity'
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
import { PhonesModule } from './modules/phones/phones.module'
import { EmailsModule } from './modules/emails/emails.module'
import { LogsModule } from './modules/logs/logs.module'
import { DevicesModule } from './modules/devices/devices.module'
import { Device } from './modules/devices/device.entity'
import { Email } from './modules/emails/email.entity'
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
			entities: [Admin, Roles, MawedyImages, Device, Email, Log, Phone],
			synchronize: true,
		}),
		AdminModule,
		RolesModule,
		MawedyImagesModule,
		PhonesModule,
		EmailsModule,
		LogsModule,
		DevicesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor(private connection: Connection) {}
}
