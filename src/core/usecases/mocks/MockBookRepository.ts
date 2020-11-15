import IBookRepository from '../../repository/IBookRepository'
import BookRequest from '../../domain/BookRequest'
import Book from '../../domain/Book'

export default class MockBookRepository implements IBookRepository {
    public postCalls: Array<BookRequest> = []
    public changeBookCalls: number = 0

    public store(request: BookRequest) {
        this.postCalls.push(request)
    }

    public fetchBook(slug: string): Promise<Book> {
        const book = new Book(slug, "A Game of Thrones", "George R. R. Martin", "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'")
        return Promise.resolve(book)
    }

    public updateBook(bookID: string) {
        this.changeBookCalls++
    }
}