import { Test, TestingModule } from "@nestjs/testing"
import { TicketsController } from "../tickets.controller"
import { TicketsService } from "../tickets.service"
import {v4 as uuidv4} from 'uuid'
import { Ticket } from "../tickets.model"
import { NotFoundException } from "@nestjs/common"


describe('TicketsController', () => {
    let ticketsController: TicketsController
    let ticketsService: TicketsService

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TicketsController],
            providers: [TicketsService],
        }).compile()

        ticketsController = app.get<TicketsController>(TicketsController)
        ticketsService = app.get<TicketsService>(TicketsService)
        TicketsService.tickets = []
    })

    describe('unit tests', () => {
        describe('addTicket', () => {            
            it('returns a JSON with the id of the created ticket', () => {
                const ticketsServiceMockResult = uuidv4()
                jest.spyOn(ticketsService, 'addTicket').mockImplementation(() => ticketsServiceMockResult)

                expect(ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')).toEqual({ id: ticketsServiceMockResult })
            })
        })

        describe('getTickets', () => {            
            it('returns an empty array', () => {
                const ticketsServiceMockResult = []
                jest.spyOn(ticketsService, 'getTickets').mockImplementation(() => ticketsServiceMockResult)

                expect(ticketsController.getTickets()).toEqual(ticketsServiceMockResult)
            })
        })

        describe('getTicket', () => {            
            it('returns a ticket from id', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                const ticketsServiceMockResult = ticket
                jest.spyOn(ticketsService, 'getTicket').mockImplementation(() => ticketsServiceMockResult)

                expect(ticketsController.getTicket(ticket.id)).toEqual(ticketsServiceMockResult)
            })
        })
    })

    
    describe('integration tests using TicketsService', () => {
        describe('addTicket', () => {            
            it('increases collection length', () => {
                expect(TicketsService.tickets.length).toBe(0)
                ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                expect(TicketsService.tickets.length).toBe(1)
            })

            it('returns a ticket id that is a valid uuid', () => {
                const uuidRegEx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
                const ticketId = ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                expect(uuidRegEx.test(ticketId.id)).toBe(true)
            })
        })

        describe('getTickets', () => {
            it('returns empty array', () => {
                expect(ticketsController.getTickets()).toEqual([])
            })

            it('returns array of tickets', () => {
                ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                const tickets = ticketsController.getTickets()
                expect(tickets[0]).toBeInstanceOf(Ticket)
            })
        })

        describe('getTicket', () => {
            it('throws error when empty', () => {
                const ticketId = uuidv4()             
                expect(() => ticketsController.getTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsController.getTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })
            
            it('throws error on unfound id', () => {
                ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                const ticketId = uuidv4()             
                expect(() => ticketsController.getTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsController.getTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('returns a ticket', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'han', 'solo')
                const ticketId = ticketsController.addTicket(ticket.eventId, ticket.barcode, 'han', 'solo').id
                ticket.id = ticketId
                const actual = ticketsController.getTicket(ticketId)
                expect(actual).toEqual(ticket)
            })
        })

        describe('updateTicket', () => {
            it('throws error when empty', () => {
                const ticketId = uuidv4()             
                expect(() => ticketsController.updateTicket(ticketId, null, null, null, null)).toThrow(NotFoundException)
                expect(() => ticketsController.updateTicket(ticketId, null, null, null, null)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })
            
            it('throws error when id cant be found', () => {
                ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                const ticketId = uuidv4()             
                expect(() => ticketsController.updateTicket(ticketId, null, null, null, null)).toThrow(NotFoundException)
                expect(() => ticketsController.updateTicket(ticketId, null, null, null, null)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('updates a given object field in place', () => {
                const ticket = new Ticket(uuidv4(), uuidv4().slice(0, 8), 'Han', 'Solo')
                TicketsService.tickets = [ ticket ]
                expect(ticketsController.getTicket(ticket.id)).toEqual(ticket)

                const newFirstName = 'testy'
                const newLastName = 'mctestface'
                const updatedTicket = {...ticket}
                updatedTicket.firstName = newFirstName
                updatedTicket.lastName = newLastName

                ticketsController.updateTicket(ticket.id, null, null, newFirstName, newLastName)
                expect(ticketsService.getTicket(ticket.id)).toEqual(updatedTicket)
            })
        })
        

        describe('deleteTicket', () => {
            it('throws error when empty', () => {
                const ticketId = uuidv4()             
                expect(() => ticketsController.deleteTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsController.deleteTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })
            
            it('throws error when id cant be found', () => {
                ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo')
                const ticketId = uuidv4()             
                expect(() => ticketsController.deleteTicket(ticketId)).toThrow(NotFoundException)
                expect(() => ticketsController.deleteTicket(ticketId)).toThrow(`Could'nt find Ticket with id: ${ticketId}`)
            })

            it('removes ticket if found', () => {
                const ticketId = ticketsController.addTicket(uuidv4(), 'a24a6ea4', 'han', 'solo').id
                expect(ticketsController.getTickets().length).toBe(1)
                ticketsController.deleteTicket(ticketId)
                expect(ticketsController.getTickets().length).toBe(0)
            })
        })
    })
})