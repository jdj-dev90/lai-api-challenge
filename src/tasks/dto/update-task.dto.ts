import { TaskType } from '@prisma/client';
import { IsInt, IsDateString, IsEnum, Min, Max, IsOptional } from 'class-validator';

export class UpdateTaskDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	account_id?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	schedule_id?: string;

	@IsOptional()
	@IsDateString()
	start_time?: string;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(999)
	duration?: number;

	@IsOptional()
	@IsEnum(TaskType)
	type?: TaskType;
}
