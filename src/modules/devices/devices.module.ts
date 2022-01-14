import { Module } from '@nestjs/common'
import { DevicesController } from './device.controller'
import { DevicesService } from './devices.service'

@Module({
	controllers: [DevicesController],
	providers: [DevicesService],
})
export class DevicesModule {}
