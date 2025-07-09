import { OnQueueActive, Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { notificationProcessor, createNotificationQueue } from "../constants/events.constants";
import { NotificationService } from "../services/notification.service";

@Processor(notificationProcessor)
export class NotificationConsumer {
    constructor(
        private readonly notificationService: NotificationService
    ){}

    @Process(createNotificationQueue)
    async createNotification(job: Job) {
        await new Promise(async (resolve, reject) => {
            try {
                await this.notificationService.create(
                    {user:job.data.user},
                    job.data.input
                )
                resolve('Data processed');
            } catch (error) {
                reject(error);
            }
        });
        return { done: true };
    }

    @OnQueueActive()
    onActive(job: Job) {
      console.log(
        `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
      );
    }
}