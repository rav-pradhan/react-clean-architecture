import IBookRepository from "../repository/IBookRepository";
import { APIResponse } from "../repository/types/APIResponse";

export default interface ToggleBookReadStatus {
    toggleBookReadStatus(bookID: string, bookReadStatus: boolean): Promise<APIResponse>
}

export default class ToggleBookReadStatus {
    private repository: IBookRepository
    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async invoke(bookID: string, bookReadStatus: boolean): Promise<APIResponse> {
        const toggleReadStatus = !bookReadStatus
        return await this.repository.toggleBookReadStatus(bookID, toggleReadStatus)
    }
}