import BookshelfRequest from '../domain/BookshelfRequest'
import { APIResponse } from './types/APIResponse';

export default interface IBookshelfRepository {
    create(request: BookshelfRequest): Promise<APIResponse>
}