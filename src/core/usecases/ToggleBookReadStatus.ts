import { APIResponse } from "../repository/types/APIResponse";

export default interface ToggleBookReadStatus {
    toggleBookReadStatus(bookID: string, bookReadStatus: boolean): Promise<APIResponse>
}