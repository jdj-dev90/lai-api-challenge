import { TaskType } from '@prisma/client';
import { IsInt, IsDateString, IsEnum, Min, Max } from 'class-validator';

export class CreateTaskDto {
  @IsInt()
  @Min(1)
  account_id: number;

  @IsInt()
  @Min(1)
  schedule_id: string;

  @IsDateString()
  start_time: string;

  @IsInt()
  @Min(1)
  @Max(999)
  duration: number;

  @IsEnum(TaskType)
  type: TaskType;
}

