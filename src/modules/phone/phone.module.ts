import { Module } from '@nestjs/common'
import { PhonesService } from './phone.service'
import { PhonesController } from './phone.controller'

@Module({
	controllers: [PhonesController],
	providers: [PhonesService],
	exports: [PhonesService],
})
export class PhonesModule {}
