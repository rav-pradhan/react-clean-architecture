import Book from "../domain/Book";
import { APIResponse } from "../repository/types/APIResponse";

export default interface ChangeBookDetails {
    changeBookDetails(bookDetails: Book): Promise<APIResponse>
}