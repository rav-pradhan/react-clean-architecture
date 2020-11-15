import BookshelfRequest from '../domain/BookshelfRequest'

export default interface IBookshelfRepository {
    create(request: BookshelfRequest): void | Error
}