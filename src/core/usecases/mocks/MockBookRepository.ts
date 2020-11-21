import IBookRepository from '../../repository/IBookRepository'
import BookRequest from '../../domain/BookRequest'
import Book from '../../domain/Book'
import { APIResponse } from '../../repository/types/APIResponse'

export default class MockBookRepository implements IBookRepository {
    public recordBookCalls: number = 0
    public changeBookCalls: number = 0
    public fetchBookCalls: number = 0
    public toggleBookReadStatusCalls: number = 0

    private books: Array<Book> = [
        new Book("123456", "a-game-of-thrones", "A Game of Thrones", "George R. R. Martin", "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'"),
        new Book("abcdef", "code-complete", "Code Complete", "Steve McConnell", "A practical handbook of software construction"),
        new Book("xyz123", "a-test", "A T", "Testy McTestface", "!")
    ]

    public recordBook(request: BookRequest): Promise<APIResponse> {
        this.recordBookCalls++
        const successResponse: APIResponse = {
            code: 201,
            message: "Book created"
        }
        return Promise.resolve(successResponse)
    }

    public fetchBook(id: string): Promise<Book|undefined> {
        this.fetchBookCalls++
        const book: Book|undefined = this.books.find(book => book.id === id)
        return Promise.resolve(book)
    }

    public updateBook(bookDetails: Book): Promise<APIResponse> {
        this.changeBookCalls++
        const successResponse: APIResponse = {
            code: 200,
            message: "Book details updated"
        }
        return Promise.resolve(successResponse)
    }

    public toggleBookReadStatus(bookID: string): Promise<APIResponse> {
        this.toggleBookReadStatusCalls++
        const successResponse: APIResponse = {
            code: 200,
            message: "Book read status updated"
        }
        return Promise.resolve(successResponse)
    }
}