import { Module } from '@nestjs/common'
import { EmailsService } from './email.service'
import { EmailsController } from './email.controller'

@Module({
	controllers: [EmailsController],
	providers: [EmailsService],
	exports: [EmailsService],
})
export class EmailsModule {}
