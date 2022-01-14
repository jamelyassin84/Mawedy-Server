import { Controller } from '@nestjs/common'
import { ClinicFilesService } from './clinic-file.service'

@Controller('clinic-files')
export class ClinicFilesController {
	constructor(private readonly clinicFilesService: ClinicFilesService) {}
}
