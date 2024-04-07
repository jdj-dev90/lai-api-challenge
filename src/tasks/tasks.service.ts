import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Injectable()
export class TasksService {
	constructor(private prisma: PrismaService) { }

	async task(
		taskWhereUniqueInput: Prisma.TaskWhereUniqueInput,
	): Promise<Task | null> {
		return this.prisma.task.findUnique({
			where: taskWhereUniqueInput,
		});
	}

	async tasks(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.TaskWhereUniqueInput;
		where?: Prisma.TaskWhereInput;
		orderBy?: Prisma.TaskOrderByWithRelationInput;
	}): Promise<Task[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.task.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
		});
	}

	async createTask(data: CreateTaskDto): Promise<Task> {
		const { schedule_id, ...rest } = data
		return this.prisma.task.create({
			data: {
				...rest,
				schedule: { connect: { id: schedule_id } }
			}
		});
	}

	async updateTask(params: {
		where: Prisma.TaskWhereUniqueInput;
		data: UpdateTaskDto;
	}): Promise<Task> {
		const { where, data } = params;
		return this.prisma.task.update({
			data,
			where,
		});
	}

	async deleteTask(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
		return this.prisma.task.delete({
			where,
		});
	}
}
