import { IsInt, IsDateString, Min } from 'class-validator';

export class CreateScheduleDto {
	@IsInt()
	@Min(1)
	account_id: number;

	@IsInt()
	@Min(1)
	agent_id: number;

	@IsDateString()
	start_time: string;

	@IsDateString()
	end_time: string;
}

