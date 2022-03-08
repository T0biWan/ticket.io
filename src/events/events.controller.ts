import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { Ticket } from "src/tickets/tickets.model";
import { EventsService } from "./events.service";


@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    addEvent (@Body('eventTitle') eventTitle: string, @Body('eventDate') eventDate: string, @Body('eventCity') eventCity: string, @Body('tickets') tickets: Ticket) {
        const newEventId = this.eventsService.addEvent(eventTitle, eventDate, eventCity, tickets)
        return { id: newEventId }
    }

    @Get()
    getEvents () {
        return this.eventsService.getEvents()
    }

    @Get(':eventId')
    getEvent (@Param('eventId') eventId: string) {        
        return this.eventsService.getEvent(eventId)
    }

    @Patch(':eventId')
    updateEvent (@Param('eventId') eventId: string, @Body('eventTitle') eventTitle: string, @Body('eventDate') eventDate: string, @Body('eventCity') eventCity: string, @Body('tickets') tickets: Ticket[]) {
        this.eventsService.updateEvent(eventId, eventTitle, eventDate, eventCity, tickets)
    }

    @Delete(':eventId')
    deleteEvent (@Param('eventId') eventId :string) {
        this.eventsService.removeEvent(eventId)
    }
}