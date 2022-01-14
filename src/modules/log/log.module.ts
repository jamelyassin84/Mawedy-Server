import { Module } from '@nestjs/common'
import { LogsService } from './log.service'
import { LogsController } from './log.controller'

@Module({
	controllers: [LogsController],
	providers: [LogsService],
})
export class LogsModule {}
