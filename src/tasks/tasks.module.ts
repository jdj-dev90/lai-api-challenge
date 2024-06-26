import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
	imports: [],
	controllers: [TasksController],
	providers: [PrismaService, TasksService],
})
export class TasksModule { }
