import Book from '../domain/Book'
import BookRequest from '../domain/BookRequest';
import { APIResponse } from './types/APIResponse';

export default interface IBookRepository {
    store(request: BookRequest): Promise<APIResponse>
    fetchBook(slug: string): Promise<Book|undefined>
    updateBook(bookDetails: Book): Promise<APIResponse>
    toggleBookReadStatus(bookID: string, newBookReadStatus: boolean): Promise<APIResponse>
}