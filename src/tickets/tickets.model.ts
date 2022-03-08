import { ForbiddenException } from '@nestjs/common'
import {v4 as uuidv4} from 'uuid'


const barcode_error_request = 'please provide a valid barcode, of not more than 8 alphanumeric characters'
const regex_alphanumeric = new RegExp(/^[a-z0-9]+$/i)

export class Ticket {
    id: string
 
    constructor (public eventId: string, public barcode: string, public firstName: string, public lastName: string) {
        if (barcode.length < 1) throw new ForbiddenException(`${barcode_error_request} - you entered an empty string`)
        if (barcode.length < 1) throw new ForbiddenException(`${barcode_error_request} - you entered an empty string`)
        if (!regex_alphanumeric.test(barcode)) throw new ForbiddenException(`${barcode_error_request} - you entered non-alphanumeric characters`)
        this.id = uuidv4()
    }
}