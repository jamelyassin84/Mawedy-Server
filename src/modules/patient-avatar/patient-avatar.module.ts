import { Module } from '@nestjs/common';
import { PatientAvatarService } from './patient-avatar.service';
import { PatientAvatarController } from './patient-avatar.controller';

@Module({
  controllers: [PatientAvatarController],
  providers: [PatientAvatarService]
})
export class PatientAvatarModule {}
