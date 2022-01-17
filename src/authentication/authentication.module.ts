import { ClinicAccountModule } from './../modules/clinic-account/clinic-account.module'
import { PatientModule } from './../modules/patient/patient.module'
import { ClinicModule } from './../modules/clinic/clinic.module'
import { JwtStrategy } from './jwt.strategy'
import { AdminModule } from './../modules/admin/admin.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthenticationController } from './authentication.controller'
import { DoctorModule } from 'src/modules/doctor/doctor.module'
import { DevicesModule } from 'src/modules/device/device.module'

@Module({
	imports: [
		PassportModule,
		AdminModule,
		ClinicModule,
		ClinicAccountModule,
		DoctorModule,
		PatientModule,
		DevicesModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async () => ({
				secret: process.env.JWT_SECRET,
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthenticationController],
	providers: [AuthService, JwtStrategy],
})
export class AuthenticationModule {}
