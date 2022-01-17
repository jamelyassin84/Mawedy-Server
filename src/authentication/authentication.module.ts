import { JwtStrategy } from './jwt.strategy'
import { AdminModule } from './../modules/admin/admin.module'
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthenticationController } from './authentication.controller'

@Module({
	imports: [
		AdminModule,
		PassportModule,
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
