import { Module } from '@nestjs/common'
import { DevicesController } from './device.controller'
import { DevicesService } from './device.service'

@Module({
	controllers: [DevicesController],
	providers: [DevicesService],
	exports: [DevicesService],
})
export class DevicesModule {}
