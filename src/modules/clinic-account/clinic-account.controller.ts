import { Controller } from '@nestjs/common';
import { ClinicAccountService } from './clinic-account.service';

@Controller('clinic-account')
export class ClinicAccountController {
  constructor(private readonly clinicAccountService: ClinicAccountService) {}
}
