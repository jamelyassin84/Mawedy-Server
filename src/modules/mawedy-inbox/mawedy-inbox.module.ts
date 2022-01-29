import { ClinicModule } from './../clinic/clinic.module'
import { forwardRef, Module } from '@nestjs/common'
import { MawedyInboxService } from './mawedy-inbox.service'
import { MawedyInboxController } from './mawedy-inbox.controller'

@Module({
	imports: [],
	controllers: [MawedyInboxController],
	providers: [MawedyInboxService],
	exports: [MawedyInboxService],
})
export class MawedyInboxModule {}
