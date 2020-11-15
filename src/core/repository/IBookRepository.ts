import Book from '../domain/Book'

export default interface IBookRepository {
    store(request: Book): void
    fetchBook(slug: string): Promise<Book>
    updateBook(bookDetails: Book): void
}