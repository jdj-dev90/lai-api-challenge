import { Test, TestingModule } from '@nestjs/testing';
import { SchedulesService } from './schedules.service';
import { PrismaService } from '../prisma/prisma.service';
import { mockPrismaService } from '../../test/mocks';
import { v4 as uuid } from 'uuid';

describe('SchedulesService', () => {
	let service: SchedulesService;
	let prismaService: PrismaService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				SchedulesService,
				{
					provide: PrismaService,
					useValue: mockPrismaService,
				},
			],
		}).compile();

		service = module.get<SchedulesService>(SchedulesService);
		prismaService = module.get<PrismaService>(PrismaService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('should get a schedule', async () => {
		const id = uuid();
		await service.schedule({ id });
		expect(prismaService.schedule.findUnique).toHaveBeenCalledWith({ where: { id } });
	});

	it('should get multiple schedules', async () => {
		await service.schedules({});
		expect(prismaService.schedule.findMany).toHaveBeenCalled();
	});

	it('should create a schedule', async () => {
		const scheduleData = {
			account_id: 123,
			agent_id: 456,
			start_time: new Date('2024-01-01T08:00:00Z').toISOString(),
			end_time: new Date('2024-01-01T12:00:00Z').toISOString(),
		};

		await service.createSchedule(scheduleData);
		expect(prismaService.schedule.create).toHaveBeenCalledWith({ data: scheduleData });
	});

	it('should update a schedule', async () => {
		const updateData = {
			account_id: 789,
			agent_id: 101,
			start_time: new Date('2024-01-02T09:00:00Z').toISOString(),
			end_time: new Date('2024-01-02T13:00:00Z').toISOString(),
		};
		const id = uuid();
		await service.updateSchedule({ where: { id }, data: updateData });
		expect(prismaService.schedule.update).toHaveBeenCalledWith({ where: { id }, data: updateData });
	});

	it('should delete a schedule', async () => {
		const id = uuid();
		await service.deleteSchedule({ id });
		expect(prismaService.schedule.delete).toHaveBeenCalledWith({ where: { id } });
	});
});
