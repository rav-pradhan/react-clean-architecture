import Book from '../domain/Book'
import BookRequest from '../domain/BookRequest';
import { APIResponse } from './types/APIResponse';

export default interface IBookGateway {
    fetchBooks(): Promise<Book[]>
    recordBook(request: BookRequest): Promise<APIResponse>
    pickUpBook(slug: string): Promise<Book|undefined>
    updateBook(bookDetails: Book): Promise<APIResponse>
    toggleBookReadStatus(bookID: string, newBookReadStatus: boolean): Promise<APIResponse>
}