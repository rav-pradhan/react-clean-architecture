import BookRequest from '../domain/BookRequest'
import Book from '../domain/Book'

export default interface IBookRepository {
    store(request: BookRequest): void
    fetchBook(slug: string): Promise<Book>
    updateBook(bookID: string): void
}