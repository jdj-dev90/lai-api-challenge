import { v4 as uuid } from 'uuid';

export const mockTaskData = {
	id: uuid(),
	account_id: 1,
	schedule_id: uuid(),
	start_time: new Date(),
	duration: 60,
	type: 'work',
};

export const mockTaskArray = [
	mockTaskData,
	{ ...mockTaskData, id: uuid(), type: 'break' }
];
