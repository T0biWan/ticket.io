import { Ticket } from 'src/tickets/tickets.model';
import {v4 as uuidv4} from 'uuid'

export class Event {
    id: string; 
 
    constructor (public eventTitle: string, public eventDate: Date, public eventCity: string, public tickets: [Ticket]) {
        // this.id = uuidv4()
        this.id = '13'
    }
}