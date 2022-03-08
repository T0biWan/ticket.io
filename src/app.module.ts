import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsService } from './tickets/tickets.service';


@Module({
    imports: [TicketsModule, EventsModule],
    controllers: [AppController],
    providers: [AppService, TicketsService, EventsService],
})
export class AppModule {}