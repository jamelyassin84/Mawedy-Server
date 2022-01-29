import { Phone } from './../phone/phone.entity'
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
	UploadedFiles,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { Clinic } from './clinic.entity'
import { ClinicService } from './clinic.service'
import { ClinicV2Service } from './clinic.v2.service'

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
		private readonly servicev2: ClinicV2Service,
		private readonly fileService: ClinicFilesService,
	) {}

	@Get()
	async findAll(): Promise<Clinic[]> {
		return this.service.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<Clinic> {
		return this.service.findOne(+id)
	}

	@Post()
	create(@Body() body: any): Promise<Clinic> {
		return this.service.create(body)
	}

	@UseInterceptors(
		FilesInterceptor('files[]', 20, {
			storage: diskStorage({
				destination: './public/uploads/clinic/trade-license/',
				filename: editFileName,
			}),
			fileFilter: imageFileFilter,
		}),
	)
	@Post('files')
	async uploadClinicFiles(
		@Body() body: any,
		@UploadedFiles() files: Express.Multer.File[],
	): Promise<void> {
		this.fileService.uploadClinicFiles(body, files)
	}

	@Patch(':id')
	async update(@Param() param, @Body() body: any): Promise<Clinic> {
		return this.service.update(param.id, body)
	}

	@Delete(':id')
	async remove(@Param() param: { id: number }): Promise<Clinic> {
		return this.service.remove(+param.id)
	}

	@Post('read')
	async read(@Body() param: { id: number }): Promise<boolean> {
		this.service.read(param.id)
		return true
	}

	@Post('activate')
	async activate(@Body() body): Promise<boolean> {
		this.service.activate(body.id)
		return true
	}

	@Post('phone')
	async addPhoneNumber(@Body() body): Promise<Phone> {
		return this.servicev2.addPhoneNumber(body)
	}
}
