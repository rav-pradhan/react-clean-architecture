export default class BookRequest {
    public title: string
    public author: string
    public notes: string

    constructor(title: string, author: string, notes: string) {
        this.title = title
        this.author = author
        this.notes = notes
    }
}