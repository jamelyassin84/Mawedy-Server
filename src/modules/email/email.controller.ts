import { Controller } from '@nestjs/common'
import { EmailsService } from './email.service'

@Controller('emails')
export class EmailsController {
	constructor(private readonly emailsService: EmailsService) {}
}
