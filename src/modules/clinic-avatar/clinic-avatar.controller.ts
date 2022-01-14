import { Controller } from '@nestjs/common'
import { ClinicAvatarsService } from './clinic-avatar.service'

@Controller('clinic-avatars')
export class ClinicAvatarsController {
	constructor(private readonly clinicAvatarsService: ClinicAvatarsService) {}
}
