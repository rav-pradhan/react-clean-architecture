import BookshelfRequest from "../domain/BookshelfRequest";
import { APIResponse } from "../repository/types/APIResponse";

export default interface CreateBookshelf {
    createShelf(request: BookshelfRequest): Promise<APIResponse>
}