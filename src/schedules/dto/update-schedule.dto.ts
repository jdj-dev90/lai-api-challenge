import { IsInt, IsDateString, Min, IsOptional } from 'class-validator';

export class UpdateScheduleDto {
	@IsOptional()
	@IsInt()
	@Min(1)
	account_id?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	agent_id?: number;

	@IsOptional()
	@IsDateString()
	start_time?: string;

	@IsOptional()
	@IsDateString()
	end_time?: string;
}


