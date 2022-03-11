import { Ticket } from "../tickets.model"
import {v4 as uuidv4} from 'uuid'
import { ForbiddenException } from "@nestjs/common";


describe('TicketsModel', () => {
    it('constructor creates a uuid as id', () => {
        const uuidRegEx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
        const ticket = new Ticket(uuidv4(), 'a24a6ea4', 'Han', 'Solo')
        expect(uuidRegEx.test(ticket.id)).toBe(true)
    })

    it('excepts only alphanumeric barcodes between 1 and 8', () => {
        expect(() => new Ticket(uuidv4(), 'a24a6ea4TOOLONG', 'Han', 'Solo')).toThrow(ForbiddenException)
        expect(() => new Ticket(uuidv4(), '', 'Han', 'Solo')).toThrow(ForbiddenException)
        expect(() => new Ticket(uuidv4(), '?', 'Han', 'Solo')).toThrow(ForbiddenException)
    })
})