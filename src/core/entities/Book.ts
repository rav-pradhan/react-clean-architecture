import { uuid } from 'uuidv4'

export class Book {
    id: string
    title: string
    author: string
    categoryID: string
    notes: string

    constructor(title: string, author: string, categoryID: string, notes: string) {
        this.title = title
        this.author = author
        this.categoryID = categoryID
        this.notes = notes
        this.id = uuid()
    }

    updateBookDetails(title: string, author: string, notes: string) {
        this.title = title
        this.author = author
        this.notes = notes
    }

    changeCategoryID(categoryID: string) {
        this.categoryID = categoryID
    }
}