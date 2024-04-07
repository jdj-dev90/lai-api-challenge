import { v4 as uuid } from 'uuid';

export const mockScheduleData = {
	id: uuid(),
	account_id: 1,
	agent_id: 1,
	start_time: new Date(),
	end_time: new Date(),
};

export const mockScheduleArray = [
	mockScheduleData,
	{ ...mockScheduleData, id: uuid() }
];
