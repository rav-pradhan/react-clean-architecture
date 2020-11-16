import BookshelfRequest from '../domain/BookshelfRequest'
import IBookshelfRepository from '../repository/IBookshelfRepository'
import { APIResponse } from '../repository/types/APIResponse'
import BookshelfService from './BookshelfService'

class MockBookshelfRepository implements IBookshelfRepository {
    createCalls: number = 0

    create(request: BookshelfRequest): Promise<APIResponse> {
        this.createCalls++
        const apiResponse: APIResponse = {
            code: 200,
            message: "Book created"
        }
        return Promise.resolve(apiResponse)
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
    test("that the bookshelf request is validated", async () => {
        const bookshelfRequest: BookshelfRequest = new BookshelfRequest("", "A bookshelf for fantasy stories")
        const mockBookshelfRequest: BookshelfRequest = bookshelfRequest
        const mockBookshelfRepository: MockBookshelfRepository = new MockBookshelfRepository()
        const bookshelfService: BookshelfService = new BookshelfService(mockBookshelfRepository)

        await expect(bookshelfService.createShelf(mockBookshelfRequest)).rejects.toThrow()
        expect(mockBookshelfRepository.createCalls).toEqual(0)
    })
})