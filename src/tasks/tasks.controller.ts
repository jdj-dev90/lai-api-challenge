import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Task, Prisma } from '@prisma/client';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) { }

	@Get()
	async getTasks(@Query() query: {
		skip?: number;
		take?: number;
		cursor?: Prisma.TaskWhereUniqueInput;
		where?: Prisma.TaskWhereInput;
		orderBy?: Prisma.TaskOrderByWithRelationInput;
	}): Promise<Task[]> {
		return this.tasksService.tasks(query);
	}

	@Get(':id')
	async getTask(@Param('id') id: string): Promise<Task | null> {
		return this.tasksService.task({ id });
	}

	@Post()
	async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.createTask(createTaskDto);
	}

	@Put(':id')
	async updateTask(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto
	): Promise<Task> {
		return this.tasksService.updateTask({
			where: { id },
			data: updateTaskDto,
		});
	}

	@Delete(':id')
	async deleteTask(@Param('id') id: string): Promise<Task> {
		return this.tasksService.deleteTask({ id });
	}
}

