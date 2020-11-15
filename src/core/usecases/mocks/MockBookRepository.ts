import IBookRepository from '../../repository/IBookRepository'
import BookRequest from '../../domain/BookRequest'
import Book from '../../domain/Book'
import { APIResponse } from '../../repository/types/APIResponse'

export default class MockBookRepository implements IBookRepository {
    public postCalls: Array<BookRequest> = []
    public changeBookCalls: number = 0

    public store(request: BookRequest): Promise<APIResponse> {
        this.postCalls.push(request)
        const successResponse: APIResponse = {
            code: 201,
            message: "Book created"
        }
        return Promise.resolve(successResponse)
    }

    public fetchBook(slug: string): Promise<Book> {
        const book = new Book(slug, "A Game of Thrones", "George R. R. Martin", "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'")
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
}