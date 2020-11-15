import BookshelfRequest from '../domain/BookshelfRequest'
import IBookshelfRepository from '../repository/IBookshelfRepository'
import BookshelfService from './BookshelfService'

class MockBookshelfRepository implements IBookshelfRepository {
    createCalls: number = 0

    create(request: BookshelfRequest) {
        this.createCalls++
    }
}

describe("CreateBookshelf usecase", () => {
    test("that a user can create a bookshelf", () => {
        const bookshelfRequest: BookshelfRequest = new BookshelfRequest("Fantasy", "A bookshelf for fantasy stories")
        const mockBookshelfRequest: BookshelfRequest = bookshelfRequest
        const mockBookshelfRepository: MockBookshelfRepository = new MockBookshelfRepository()
        const bookshelfService: BookshelfService = new BookshelfService(mockBookshelfRepository)

        bookshelfService.createShelf(mockBookshelfRequest)

        expect(mockBookshelfRepository.createCalls).toEqual(1)
    })
    test("that the bookshelf request is validated", () => {
        const bookshelfRequest: BookshelfRequest = new BookshelfRequest("", "A bookshelf for fantasy stories")
        const mockBookshelfRequest: BookshelfRequest = bookshelfRequest
        const mockBookshelfRepository: MockBookshelfRepository = new MockBookshelfRepository()
        const bookshelfService: BookshelfService = new BookshelfService(mockBookshelfRepository)

        expect(() => {bookshelfService.createShelf(mockBookshelfRequest)}).toThrow()
        expect(mockBookshelfRepository.createCalls).toEqual(0)
    })
})