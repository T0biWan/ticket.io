import { Injectable, NotFoundException } from "@nestjs/common"
import { Ticket } from "./tickets.model"


@Injectable()
export class TicketsService {
    private static tickets: Ticket[] = []

    private findTicket (ticketId: string): [Ticket, number] {
        const index = TicketsService.tickets.findIndex(ticket => ticket.id === ticketId)
        const ticket = TicketsService.tickets[index]
        if (!ticket) throw new NotFoundException(`Could'nt find Ticket with id: ${ticketId}`)
        return [ticket, index]
    }

    addTicket (eventId: string, barcode: string, firstName: string, lastName: string) {
        const newTicket = new Ticket(eventId, barcode, firstName, lastName)
        TicketsService.tickets.push(newTicket)
                
        return newTicket.id
    }

    getTickets () {
        return [...TicketsService.tickets]
    }

    getTicket (ticketId: string) {
        const [ticket, index] = this.findTicket(ticketId)
        return { ...ticket }
    }

    updateTicket (ticketId: string, eventId: string, barcode: string, firstName: string, lastName: string) {
        const [ticket, index] = this.findTicket(ticketId)
        const updatedTicket = {...ticket}
        
        if (eventId) updatedTicket.eventId = eventId
        if (barcode) updatedTicket.barcode = barcode
        if (firstName) updatedTicket.firstName = firstName
        if (lastName) updatedTicket.lastName = lastName

        TicketsService.tickets[index] = updatedTicket
    }

    removeTicket (ticketId: string) {
        const [ticket, index] = this.findTicket(ticketId)
        TicketsService.tickets.splice(index, 1)
    }
}