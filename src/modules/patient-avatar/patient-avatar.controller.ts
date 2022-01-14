import { Controller } from '@nestjs/common';
import { PatientAvatarService } from './patient-avatar.service';

@Controller('patient-avatar')
export class PatientAvatarController {
  constructor(private readonly patientAvatarService: PatientAvatarService) {}
}
