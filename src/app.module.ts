import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
	imports: [SchedulesModule, TasksModule],
	controllers: [],
	providers: [],
})
export class AppModule { }
