import { editFileName, imageFileFilter } from './../../helpers/helpers'
import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	Param,
	Patch,
	Delete,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
} from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { ClinicDto } from './clinic.dto'
import { Clinic } from './clinic.entity'
import { ClinicService } from './clinic.service'

@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('Clinics')
@Controller(resolveAPI(ROUTES.CLINICS))
export class ClinicController {
	constructor(private readonly service: ClinicService) {}

	@Get()
	// @UseGuards(JwtAuthGuard)
	async findAll(): Promise<Clinic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	// @UseGuards(JwtAuthGuard)
	findOne(@Param('id') id: string): Promise<Clinic> {
		return this.service.findOne(+id)
	}

	@Post() //TODO App Guard
	@UseInterceptors(
		FilesInterceptor('files[]', 20, {
			storage: diskStorage({
				destination: './public/uploads/clinic-files/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	create(
		@Body() body: ClinicDto,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<Clinic> {
		return this.service.create(body, files)
	}

	@Patch(':id')
	// @UseGuards(JwtAuthGuard)
	async update(@Param() param, @Body() body: ClinicDto): Promise<Clinic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	// @UseGuards(JwtAuthGuard)
	async remove(@Param() param): Promise<Clinic> {
		return this.service.remove(+param.id)
	}
}
