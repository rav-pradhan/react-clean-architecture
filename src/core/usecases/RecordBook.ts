import BookRequest from "../domain/BookRequest";
import { APIResponse } from "../repository/types/APIResponse";

export default interface RecordBook {
    recordBook(request: BookRequest): Promise<APIResponse>
}