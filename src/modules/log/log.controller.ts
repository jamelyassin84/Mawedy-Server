import { Controller } from '@nestjs/common'
import { LogsService } from './log.service'

@Controller('logs')
export class LogsController {
	constructor(private readonly logsService: LogsService) {}
}
