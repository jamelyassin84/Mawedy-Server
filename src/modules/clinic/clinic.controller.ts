import { ClinicFilesService } from './../clinic-file/clinic-file.service'
import { editFileName, imageFileFilter } from './../../helpers/helpers'
import {
	Body,
	Controller,
	Get,
	Post,
	Param,
	Patch,
	Delete,
	UseInterceptors,
	UploadedFile,
	UploadedFiles,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { resolveAPI, ROUTES } from 'src/routes/routes'
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
	constructor(
		private readonly service: ClinicService,
		private readonly fileService: ClinicFilesService,
	) {}

	@Get() //TODO: ADMIN GUARD
	async findAll(): Promise<Clinic[]> {
		return this.service.findAll()
	}

	@Get(':id') //TODO: ADMIN GUARD
	findOne(@Param('id') id: string): Promise<Clinic> {
		return this.service.findOne(+id)
	}

	@Post() //TODO App Guard
	create(@Body() body: any): Promise<Clinic> {
		return this.service.create(body)
	}

	@UseInterceptors(
		FilesInterceptor('files[]', 20, {
			storage: diskStorage({
				destination: './public/uploads/clinic/files/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('files') //TODO App Guard
	async uploadClinicFiles(
		@Body() body: any,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<void> {
		this.fileService.uploadClinicFiles(body, files)
	}

	@Patch(':id') //TODO: ADMIN GUARD
	async update(@Param() param, @Body() body: any): Promise<Clinic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id') //TODO: ADMIN GUARD
	async remove(@Param() param: { id: number }): Promise<Clinic> {
		return this.service.remove(+param.id)
	}

	@Post('read') //TODO: ADMIN GUARD
	async read(@Body() param: { id: number }): Promise<boolean> {
		this.service.read(param.id)
		return true
	}

	@Post('activate') //TODO: ADMIN GUARD
	async activate(@Body() param): Promise<boolean> {
		this.service.activate(param.id)
		return true
	}
}
