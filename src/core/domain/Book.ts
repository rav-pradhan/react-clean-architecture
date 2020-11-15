import { uuid } from 'uuidv4'

export default class Book {
    id: string
    slug: string
    title: string
    author: string
    notes: string

    constructor(slug: string, title: string, author: string, notes: string) {
        this.slug = slug
        this.title = title
        this.author = author
        this.notes = notes
        this.id = uuid()
    }
}