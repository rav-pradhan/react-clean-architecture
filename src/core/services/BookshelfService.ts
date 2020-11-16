import BookshelfRequest from '../domain/BookshelfRequest'
import IBookshelfRepository from '../repository/IBookshelfRepository'
import { APIResponse } from '../repository/types/APIResponse'
import CreateBookshelf from '../usecases/CreateBookshelf'

export default class BookshelfService implements CreateBookshelf {
    repository: IBookshelfRepository

    constructor(repository: IBookshelfRepository) {
        this.repository = repository
    }

    public async createShelf(request: BookshelfRequest): Promise<APIResponse> {
        if (this.isValidRequest(request)) {
            return await this.repository.create(request)
        }
        throw new Error("bookshelf request was invalid")
    }

    private isValidRequest(request: BookshelfRequest): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).every(areTruthy)
    }
}