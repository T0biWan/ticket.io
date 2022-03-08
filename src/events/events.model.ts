import { Ticket } from 'src/tickets/tickets.model';
import {v4 as uuidv4} from 'uuid'

export class Event {
    id: string; 
 
    constructor (private eventTitle: string, private eventDate: Date, private eventCity: string, private tickets: [Ticket]) {
        this.id = uuidv4()
    }
}