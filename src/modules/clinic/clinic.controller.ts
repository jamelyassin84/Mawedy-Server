import { Controller } from '@nestjs/common';
import { ClinicService } from './clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}
}
