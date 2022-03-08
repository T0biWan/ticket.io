import { Injectable, NotFoundException } from "@nestjs/common"
import { Event } from "./events.model"


@Injectable()
export class EventsService {
    private static events: Event[] = []    

    private findEvent (eventId: string): [Event, number] {
        const index = EventsService.events.findIndex(event => event.id === eventId)
        const event = EventsService.events[index]
        if (!event) throw new NotFoundException(`Could'nt find Event with id: ${eventId}`)
        return [event, index]
    }

    addEvent (eventTitle, eventDate, eventCity, tickets) {
        const newEvent = new Event(eventTitle, eventDate, eventCity, tickets)
        EventsService.events.push(newEvent)
        
        return newEvent.id
    }

    getEvents () {
        return [...EventsService.events]
    }

    getEvent (eventId: string) {
        const [event, index] = this.findEvent(eventId)
        return { ...event }
    }

    updateEvent (eventId: string, eventTitle: string, eventDate: Date, eventCity: string) {
        const [event, index] = this.findEvent(eventId)
        const updatedEvent = {...event}
        
        if (eventTitle) updatedEvent.eventTitle = eventTitle
        if (eventDate) updatedEvent.eventDate = eventDate
        if (eventCity) updatedEvent.eventCity = eventCity

        EventsService.events[index] = updatedEvent
    }

    removeEvent (eventId: string) {
        const [event, index] = this.findEvent(eventId)
        EventsService.events.splice(index, 1)
    }
}