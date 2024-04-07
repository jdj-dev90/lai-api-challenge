import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';

describe('TasksController (e2e)', () => {
	let app: INestApplication;
	let prismaService: PrismaService;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			controllers: [TasksController],
			providers: [TasksService, PrismaService],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		prismaService = app.get<PrismaService>(PrismaService);
	});

	afterEach(async () => {
		await prismaService.task.deleteMany({});
	});

	afterAll(async () => {
		await app.close();
	});

	it('/tasks (POST) should create a task', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		const taskDto = {
			account_id: 1,
			schedule_id: schedule.id,
			start_time: new Date().toISOString(),
			duration: 60,
			type: 'work',
		};

		await request(app.getHttpServer())
			.post('/tasks')
			.send(taskDto)
			.expect(201)
			.then((response) => {
				/* expect(response.body).toEqual(expect.objectContaining(taskDto)); */
				expect(response.body).toEqual(expect.objectContaining({
					account_id: taskDto.account_id,
					schedule_id: taskDto.schedule_id,
					duration: taskDto.duration,
					type: taskDto.type,
				}));
			});
	});

	it('/tasks (GET) should retrieve tasks', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		await prismaService.task.create({
			data: {
				account_id: 1,
				schedule_id: schedule.id,
				start_time: new Date(),
				duration: 60,
				type: 'work',
			},
		});

		await request(app.getHttpServer())
			.get('/tasks')
			.expect(200)
			.then((response) => {
				expect(Array.isArray(response.body)).toBe(true);
				expect(response.body.length).toBeGreaterThan(0);
			});
	});

	it('/tasks/:id (GET) should retrieve a task by id', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		const task = await prismaService.task.create({
			data: {
				account_id: 1,
				schedule_id: schedule.id,
				start_time: new Date(),
				duration: 60,
				type: 'work',
			},
		});

		await request(app.getHttpServer())
			.get(`/tasks/${task.id}`)
			.expect(200)
			.then((response) => {
				expect(response.body.id).toEqual(task.id);
			});
	});

	it('/tasks/:id (PUT) should update a task', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		const task = await prismaService.task.create({
			data: {
				account_id: 1,
				schedule_id: schedule.id,
				start_time: new Date(),
				duration: 60,
				type: 'work',
			},
		});

		const updateDto = {
			duration: 120,
			type: 'break',
		};

		await request(app.getHttpServer())
			.put(`/tasks/${task.id}`)
			.send(updateDto)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(expect.objectContaining(updateDto));
			});
	});

	it('/tasks/:id (DELETE) should delete a task', async () => {
		const schedule = await prismaService.schedule.create({
			data: {
				account_id: 1,
				agent_id: 1,
				start_time: new Date(),
				end_time: new Date(),
			},
		});

		const task = await prismaService.task.create({
			data: {
				account_id: 1,
				schedule_id: schedule.id,
				start_time: new Date(),
				duration: 60,
				type: 'work',
			},
		});

		await request(app.getHttpServer())
			.delete(`/tasks/${task.id}`)
			.expect(200)
			.then((response) => {
				expect(response.body.id).toEqual(task.id);
			});
	});
});

