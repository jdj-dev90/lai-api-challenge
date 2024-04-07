import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Schedule, Prisma } from '@prisma/client';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto, UpdateScheduleDto } from './dto';

@Controller('schedules')
export class SchedulesController {
	constructor(private readonly schedulesService: SchedulesService) { }

	@Get()
	async getSchedules(@Query() query: {
		skip?: number;
		take?: number;
		cursor?: Prisma.ScheduleWhereUniqueInput;
		where?: Prisma.ScheduleWhereInput;
		orderBy?: Prisma.ScheduleOrderByWithRelationInput;
	}): Promise<Schedule[]> {
		return this.schedulesService.schedules(query);
	}

	@Get(':id')
	async getSchedule(@Param('id') id: string): Promise<Schedule | null> {
		return this.schedulesService.schedule({ id });
	}

	@Post()
	async createSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
		return this.schedulesService.createSchedule(createScheduleDto);
	}

	@Put(':id')
	async updateSchedule(
		@Param('id') id: string,
		@Body() updateScheduleDto: UpdateScheduleDto,
	): Promise<Schedule> {
		return this.schedulesService.updateSchedule({
			where: { id },
			data: updateScheduleDto,
		});
	}

	@Delete(':id')
	async deleteSchedule(@Param('id') id: string): Promise<Schedule> {
		return this.schedulesService.deleteSchedule({ id });
	}
}


