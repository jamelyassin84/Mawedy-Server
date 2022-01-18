import { AppSessionDto } from './mawedy-session.dto'
import { MawedySessionService } from './mawedy-session.service'
import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	ServiceUnavailableException,
	UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard'
import { resolveAPI, ROUTES } from 'src/routes/routes'
import { AppSession } from './mawedy-session.entity'
@ApiBearerAuth()
@ApiHeaders([
	{
		name: 'token',
		description: 'Authorization',
	},
])
@ApiTags('App Sessions')
@Controller(resolveAPI(ROUTES.APP_SESSIONS))
export class MawedySessionController {
	constructor() {}

	async findAll(): Promise<AppSession[]> {
		const data = await AppSession.find({
			relations: ['emails', 'phones', 'devices'],
		})
		return data
	}

	async findOne(id: number): Promise<AppSession> {
		try {
			const data = await AppSession.findOneOrFail(id)
			return data
		} catch (error) {
			throw new NotFoundException('data might be moved or deleted.')
		}
	}

	async create(body: AppSessionDto | any): Promise<AppSession> {
		try {
			const data = AppSession.create(body) as any
			await data.save()
			const params = {
				data: data as any,
				...body,
				isActive: true,
			}
			return await AppSession.findOne({
				where: { id: params.id },
				relations: ['emails', 'phones', 'devices'],
			})
		} catch (error) {
			throw new ServiceUnavailableException(
				'Something went wrong. Please try again',
			)
		}
	}

	async update(
		id: number,
		body: AppSessionDto | any,
	): Promise<AppSession | any> {
		try {
			const data = await AppSession.update(id, body)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to update clinic account might be moved or deleted.',
			)
		}
	}

	async remove(id: number): Promise<AppSession> {
		try {
			const data = await AppSession.findOneOrFail(id)
			AppSession.delete(id)
			return data
		} catch (error) {
			throw new NotFoundException(
				'Unable to delete clinic account might be moved or deleted.',
			)
		}
	}
}
