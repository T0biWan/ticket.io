import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Ticket } from '../tickets.model'
import { TicketsService } from '../tickets.service'
import {v4 as uuidv4} from 'uuid'


describe('TicketsService', () => {
    let ticketsService: TicketsService

    beforeEach(async () => {        
        const app: TestingModule = await Test.createTestingModule({
            providers: [TicketsService],
        }).compile()

        ticketsService = app.get<TicketsService>(TicketsService)
        TicketsService.tickets = []
    })

    describe('utility methods', () => {
        describe('findTicket', () => {
            it('throws NotFoundException when empty, with useful error message', () => {
                const ticketId = '33'
                expect(() => ticketsService.findTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsService.findTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('returns a tuple of ticket and index when given a correct ticketId, that is stored in tickets', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                const ticketId = ticket.id
                TicketsService.tickets = [ ticket ]
          
                expect(ticketsService.findTicket(ticketId)).toEqual([ticket, 0])
            })

            it('returns a tuple of ticket and index when given a correct ticketId, that is stored in tickets, even with multiple entries', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                const ticketId = ticket.id
                TicketsService.tickets = [ ticket, new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo'), new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo') ]
          
                expect(ticketsService.findTicket(ticketId)).toEqual([ticket, 0])
            })
        })
    })

    describe('CRUD methods', () => {
        describe('addTicket', () => {
            it('adds a ticket to collection', () => {
                expect(TicketsService.tickets.length).toBe(0)
                ticketsService.addTicket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                expect(TicketsService.tickets.length).toBe(1)
            })

            it('returns a ticket id, which is a valid uuid', () => {
                const uuidRegEx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
                const ticketId = ticketsService.addTicket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                expect(uuidRegEx.test(ticketId)).toBe(true)
            })
        })

        describe('getTickets', () => {
            it('returns empty array', () => {
                expect(ticketsService.getTickets()).toEqual([])
            })

            it('returns an array of tickets', () => {
                const ticket1 = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                const ticket2 = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')

                TicketsService.tickets = [ ticket1, ticket2 ]
                expect(ticketsService.getTickets()).toEqual([ ticket1, ticket2 ])
            })
        })

        describe('getTicket', () => {
            it('throws NotFoundException when empty, with useful error message', () => {
                const ticketId = uuidv4()
                expect(() => ticketsService.getTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsService.getTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('throws NotFoundException given an id that was not found, with useful error message', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                const ticketId = uuidv4()
                expect(() => ticketsService.getTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsService.getTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('returns ticket', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                expect(ticketsService.getTicket(ticket.id)).toEqual(ticket)
            })
        })

        describe('updateTicket', () => {
            it('updates a given object field in place', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                expect(ticketsService.getTicket(ticket.id)).toEqual(ticket)

                const newFirstName = 'testy'
                const newLastName = 'mctestface'
                const updatedTicket = {...ticket}
                updatedTicket.firstName = newFirstName
                updatedTicket.lastName = newLastName

                ticketsService.updateTicket(ticket.id, null, null, newFirstName, newLastName)
                expect(ticketsService.getTicket(ticket.id)).toEqual(updatedTicket)
            })

            it('throws NotFoundException given an id that was not found, with useful error message', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                const ticketId = uuidv4()
                expect(() => ticketsService.updateTicket(ticketId, null, null, null, null)).toThrow(NotFoundException)
                expect(() => ticketsService.updateTicket(ticketId, null, null, null, null)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })
        })

        describe('removeTicket', () => {
            it('removes ticket if found', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                expect(TicketsService.tickets.length).toBe(1)
                ticketsService.removeTicket(ticket.id)
                expect(TicketsService.tickets.length).toBe(0)
            })

            it('throws NotFoundException given an id that was not found, with useful error message', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                const ticketId = uuidv4()
                expect(() => ticketsService.removeTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsService.removeTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })
        })
    })
})