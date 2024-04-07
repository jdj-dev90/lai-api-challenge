import { Module } from '@nestjs/common';
import { SchedulesController } from '../schedules/schedules.controller';
import { PrismaService } from '../prisma/prisma.service';
import { SchedulesService } from './schedules.service';

@Module({
	imports: [],
	controllers: [SchedulesController],
	providers: [PrismaService, SchedulesService],
})
export class SchedulesModule { }
