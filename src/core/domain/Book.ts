export default class Book {
    id: string
    slug: string
    title: string
    author: string
    hasRead: boolean
    notes: string

    constructor(id: string, slug: string, title: string, author: string, notes: string, hasRead: boolean) {
        this.id = id
        this.slug = slug
        this.title = title
        this.author = author
        this.hasRead = hasRead
        this.notes = notes
    }
}