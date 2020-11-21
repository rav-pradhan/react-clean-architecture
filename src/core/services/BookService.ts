import IBookRepository from '../repository/IBookRepository'
import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'
import { APIResponse } from '../repository/types/APIResponse'
import RecordBook from '../usecases/RecordBook'
import PickUpBookFromShelf from '../usecases/PickUpBook'
import MarkBookAsRead from '../usecases/ToggleBookReadStatus'

export default class BookService implements RecordBook, MarkBookAsRead {
    repository: IBookRepository

    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async recordBook(request: BookRequest): Promise<APIResponse> {
        if (this.isValidRequest(request)) {
            return await this.repository.store(request)
        }
        throw new Error("book request was invalid")
    }

    public async toggleBookReadStatus(bookID: string, bookReadStatus: boolean): Promise<APIResponse> {
        const toggleReadStatus = !bookReadStatus
        return await this.repository.toggleBookReadStatus(bookID, toggleReadStatus)
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).filter(el => typeof el === "string").every(areTruthy)
    }
}
