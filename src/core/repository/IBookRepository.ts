import Book from '../domain/Book'
import { APIResponse } from './types/APIResponse';

export default interface IBookRepository {
    store(request: Book): Promise<APIResponse>
    fetchBook(slug: string): Promise<Book>
    updateBook(bookDetails: Book): Promise<APIResponse>
}