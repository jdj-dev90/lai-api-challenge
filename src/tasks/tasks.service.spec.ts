import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from '../prisma/prisma.service';
import { TaskType } from '@prisma/client';
import { CreateTaskDto } from './dto';
import { mockPrismaService } from '../../test/mocks';
import { v4 as uuid } from 'uuid';

describe('TasksService', () => {
	let service: TasksService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<TasksService>(TasksService);
		prismaService = module.get<PrismaService>(PrismaService);

	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get a task', async () => {
		const id = uuid();
		await service.task({ id });
		expect(prismaService.task.findUnique).toHaveBeenCalledWith({ where: { id } });
	});

	it('should get multiple tasks', async () => {
		await service.tasks({});
		expect(prismaService.task.findMany).toHaveBeenCalled();
	});

	it('should create a task', async () => {
		const taskDto: CreateTaskDto = {
			account_id: 1,
			schedule_id: uuid(),
			start_time: new Date('2024-01-01T10:00:00Z').toISOString(),
			duration: 60,
			type: TaskType.work,
		};

		const expectedCreateArg = {
			data: {
				account_id: taskDto.account_id,
				start_time: taskDto.start_time,
				duration: taskDto.duration,
				type: taskDto.type,
				schedule: { connect: { id: taskDto.schedule_id } }
			},
		};

		await service.createTask(taskDto);
		expect(prismaService.task.create).toHaveBeenCalledWith(expectedCreateArg);
	});

	it('should update a task', async () => {
		const updateData = {
			duration: 90,
			type: TaskType.break,
		};
		const id = uuid();
		await service.updateTask({ where: { id }, data: updateData });
		expect(prismaService.task.update).toHaveBeenCalledWith({ where: { id }, data: updateData });
	});

	it('should delete a task', async () => {
		const id = uuid();
		await service.deleteTask({ id });
		expect(prismaService.task.delete).toHaveBeenCalledWith({ where: { id } });
	});
});

