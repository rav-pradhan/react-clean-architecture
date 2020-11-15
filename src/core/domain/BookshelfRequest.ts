import { uuid } from 'uuidv4'

export default class BookshelfRequest {
    id: string
    name: string
    description: string

    constructor(name: string, description: string) {
        this.name = name
        this.description = description
        this.id = uuid()
    }
}