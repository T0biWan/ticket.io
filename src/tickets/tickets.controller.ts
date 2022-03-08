import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"
import { TicketsService } from "./tickets.service"


@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {} 
    
    
    @Post()
    addTicket (@Body('eventId') eventId: string, @Body('barcode') barcode: string, @Body('firstName') firstName: string, @Body('lastName') lastName: string) {
        const newTicketId = this.ticketsService.addTicket(eventId, barcode, firstName, lastName)
        return { id: newTicketId }
    }

    @Get()
    getTickets () {
        return this.ticketsService.getTickets()
    }

    @Get(':ticketId')
    getTicket (@Param('ticketId') ticketId: string) {        
        return this.ticketsService.getTicket(ticketId)
    }

    @Patch(':ticketId')
    updateTicket (@Param('ticketId') ticketId: string, @Body('eventid') eventid: string, @Body('barcode') barcode: string, @Body('firstName') firstName: string, @Body('lastName') lastName: string) {
        this.ticketsService.updateTicket(ticketId, eventid, barcode, firstName, lastName)
    }

    @Delete(':ticketId')
    deleteTicket (@Param('ticketId') ticketId :string) {
        this.ticketsService.removeTicket(ticketId)
    }
}