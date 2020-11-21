import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'
import BookService from './BookService'
import MockBookRepository from './mocks/MockBookRepository'

describe('RecordBook usecase', () => {
    test('that a new book can be recorded', () => {
        const bookRequest: BookRequest = new BookRequest(
            "A Game of Thrones",
            "George R. R. Martin",
            "Test book",
        )
        const { mockBookRepository, bookService } = initialise(bookRequest)

        bookService.recordBook(bookRequest)
        expect(mockBookRepository.postCalls.length).toEqual(1)
    })

    test('that a book request is validated', async () => {
        const bookRequest: BookRequest = new BookRequest(
            "",
            "",
            "",
        )
        const { mockBookRepository, bookService } = initialise(bookRequest)

        await expect(bookService.recordBook(bookRequest)).rejects.toThrow()
        expect(mockBookRepository.postCalls.length).toEqual(0)
    })
})

describe("ToggleBookReadStatus usecase", () => {
    test("that a request to mark book as read is accepted", async () => {
        const book = new Book("123456", "a-game-of-thrones", "A Game of Thrones", "Georgey Boy", "Test notes")
        const mockBookRepository = new MockBookRepository()
        const bookService = new BookService(mockBookRepository)

        const response = await bookService.toggleBookReadStatus(book.id, book.hasRead)

        expect(mockBookRepository.toggleBookReadStatusCalls).toEqual(1)
        expect(response.code).toEqual(200)
    })
})

function initialise(bookRequest: BookRequest) {
    const mockBookRepository: MockBookRepository = new MockBookRepository()
    return {
        mockBookRepository,
        bookService: new BookService(mockBookRepository)
    }
}