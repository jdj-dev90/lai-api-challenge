import { mockScheduleArray, mockScheduleData } from "./schedules.mock";
import { mockTaskArray, mockTaskData } from "./tasks.mock";

export const mockPrismaService = {
	schedule: {
		findUnique: jest.fn().mockResolvedValue(mockScheduleData),
		findMany: jest.fn().mockResolvedValue(mockScheduleArray),
		create: jest.fn().mockResolvedValue(mockScheduleData),
		update: jest.fn().mockResolvedValue(mockScheduleData),
		delete: jest.fn().mockResolvedValue(mockScheduleData),
	},
	task: {
		findUnique: jest.fn().mockResolvedValue(mockTaskData),
		findMany: jest.fn().mockResolvedValue(mockTaskArray),
		create: jest.fn().mockResolvedValue(mockTaskData),
		update: jest.fn().mockResolvedValue(mockTaskData),
		delete: jest.fn().mockResolvedValue(mockTaskData),
	},
};
