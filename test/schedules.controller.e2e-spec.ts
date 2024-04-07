import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { SchedulesController } from '../src/schedules/schedules.controller';
import { SchedulesService } from '../src/schedules/schedules.service';

describe('SchedulesController (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [SchedulesController],
			providers: [SchedulesService, PrismaService],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		prismaService = app.get<PrismaService>(PrismaService);
	});

	afterEach(async () => {
		await prismaService.schedule.deleteMany({});
	});

	afterAll(async () => {
		await app.close();
	});

	it('/schedules (POST) should create a schedule', async () => {
		const scheduleDto = {
			account_id: 1,
			agent_id: 1,
			start_time: new Date().toISOString(),
			end_time: new Date().toISOString(),
		};

		await request(app.getHttpServer())
			.post('/schedules')
			.send(scheduleDto)
			.expect(201)
			.then((response) => {
				expect(response.body).toEqual(expect.objectContaining(scheduleDto));
			});
	});

	it('/schedules (GET) should retrieve schedules', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		await request(app.getHttpServer())
			.get('/schedules')
			.expect(200)
			.then((response) => {
				expect(response.body.length).toBeGreaterThan(0);
				expect(response.body.some((s: any) => s.id === schedule.id)).toBe(true);
			});
	});

	it('/schedules/:id (GET) should retrieve a schedule by id', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		await request(app.getHttpServer())
			.get(`/schedules/${schedule.id}`)
			.expect(200)
			.then((response) => {
				expect(response.body.id).toEqual(schedule.id);
			});
	});

	it('/schedules/:id (PUT) should update a schedule', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		const updateDto = {
			account_id: 2,
			agent_id: 2,
			start_time: new Date().toISOString(),
			end_time: new Date().toISOString(),
		};

		await request(app.getHttpServer())
			.put(`/schedules/${schedule.id}`)
			.send(updateDto)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(expect.objectContaining(updateDto));
			});
	});

	it('/schedules/:id (DELETE) should delete a schedule', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		await request(app.getHttpServer())
			.delete(`/schedules/${schedule.id}`)
			.expect(200)
			.then((response) => {
				expect(response.body.id).toEqual(schedule.id)
			})
	})
})
