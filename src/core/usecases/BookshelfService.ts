import BookshelfRequest from '../domain/BookshelfRequest'
import IBookshelfRepository from '../repository/IBookshelfRepository'

interface BookshelfUseCases {
    createShelf(request: BookshelfRequest): void | Error
}

export default class BookshelfService implements BookshelfUseCases {
    repository: IBookshelfRepository

    constructor(repository: IBookshelfRepository) {
        this.repository = repository
    }

    public createShelf(request: BookshelfRequest) {
        if (this.isValidRequest(request)) {
            return this.repository.create(request)
        }
        throw new Error("bookshelf request was invalid")
    }

    private isValidRequest(request: BookshelfRequest): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).every(areTruthy)
    }
}