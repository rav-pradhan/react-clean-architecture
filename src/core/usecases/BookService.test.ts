import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'
import BookService from './BookService'
import MockBookRepository from './mocks/MockBookRepository'

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

describe("ChangeBookDetails usecase", () => {
    test("that the user can change a book's details", async () => {
        const bookID: string = "abc-def-123"
        const mockBookRepository = new MockBookRepository()
        const bookService = new BookService(mockBookRepository)

        bookService.changeBookDetails(bookID)

        expect(mockBookRepository.changeBookCalls).toEqual(1)
    })
})

function initialiseMocks(bookRequest: BookRequest) {
    const mockBookRepository: MockBookRepository = new MockBookRepository()
    return {
        mockBookRequest: bookRequest,
        mockBookRepository,
        bookService: new BookService(mockBookRepository)
    }
}