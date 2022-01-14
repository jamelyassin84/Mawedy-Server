import { Module } from '@nestjs/common';
import { ClinicPromotionService } from './clinic-promotion.service';
import { ClinicPromotionController } from './clinic-promotion.controller';

@Module({
  controllers: [ClinicPromotionController],
  providers: [ClinicPromotionService]
})
export class ClinicPromotionModule {}
