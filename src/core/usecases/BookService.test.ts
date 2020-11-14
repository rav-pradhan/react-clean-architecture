import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'
import IBookRepository from '../repository/IBookRepository'
import BookService from './BookService'

class MockBookRepository implements IBookRepository {
    public postCalls: Array<BookRequest> = []

    public store(request: BookRequest) {
        this.postCalls.push(request)
    }

    public fetchBook(slug: string): Promise<Book> {
        const book = new Book(slug, "A Game of Thrones", "George R. R. Martin", "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'")
        return Promise.resolve(book)
    }
}

describe('RecordBook usecase', () => {
    test('that a new book can be recorded', () => {
        const bookRequest: BookRequest = new BookRequest(
            "A Game of Thrones",
            "George R. R. Martin",
            "Test book"
        )
        const { mockBookRequest, mockBookRepository, bookService } = initialiseMocks(bookRequest)

        bookService.recordBook(mockBookRequest)

        expect(mockBookRepository.postCalls.length).toEqual(1)
    })

    test('that a book request is validated', () => {
        const bookRequest: BookRequest = new BookRequest(
            "",
            "",
            "",
        )
        const { mockBookRequest, mockBookRepository, bookService } = initialiseMocks(bookRequest)

        expect(() => {bookService.recordBook(mockBookRequest)}).toThrow()
        expect(mockBookRepository.postCalls.length).toEqual(0)
    })
})



describe("TakeBookFromShelf usecase", () => {
    test("that the user can take a book from a bookshelf", async () => {
        const bookToPickUpSlug: string = "a-game-of-thrones"
        const mockBookRepository = new MockBookRepository()
        const bookService = new BookService(mockBookRepository)

        const bookDTO = await bookService.pickUpBookFromShelf(bookToPickUpSlug)
        const book: Book = new Book(bookDTO.slug, bookDTO.title, bookDTO.author, bookDTO.notes)

        expect(book).toMatchObject({
            slug: "a-game-of-thrones",
            title: "A Game of Thrones",
            author: "George R. R. Martin",
            notes: "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'"
        })
    })
})

function initialiseMocks(bookRequest: BookRequest) {
    const mockBookRepository = new MockBookRepository()
    return {
        mockBookRequest: bookRequest,
        mockBookRepository,
        bookService: new BookService(mockBookRepository)
    }

}