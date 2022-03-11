import { Body, Controller, Get, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { EventsService } from './events/events.service'
import { TicketsService } from './tickets/tickets.service'
import {v4 as uuidv4} from 'uuid'


@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly ticketsService: TicketsService, private readonly eventsService: EventsService) {}

    
    @Post('init')
    init () {
        console.log('[init] create entries in temporary state')
        TicketsService.tickets = []
        EventsService.events = []
        const newEventId = this.eventsService.addEvent('Royal Award Ceremony', '2022-04-01T20:00:00', 'Yavin 4', [])    
        this.ticketsService.addTicket(newEventId, uuidv4().slice(0, 8), 'Han', 'Solo')
        this.ticketsService.addTicket(newEventId, uuidv4().slice(0, 8), 'Luke', 'Skywalker')
        this.ticketsService.addTicket(newEventId, uuidv4().slice(0, 8), 'Chewbacca', 'None')
        
        const event = this.eventsService.getEvent(newEventId)
        const tickets = this.ticketsService.getTickets()
        this.eventsService.updateEvent(event.id, event.eventTitle, event.eventDate, event.eventCity, tickets)
    }
}