export default class Book {
    id: string
    slug: string
    title: string
    author: string
    hasRead: boolean
    notes: string

    constructor(id: string, slug: string, title: string, author: string, notes: string) {
        this.id = id
        this.slug = slug
        this.title = title
        this.author = author
        this.hasRead = false
        this.notes = notes
    }
}