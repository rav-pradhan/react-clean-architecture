import IBookGateway from "../gateway/IBookGateway";
import { APIResponse } from "../gateway/types/APIResponse";

export default interface ToggleBookReadStatus {
    toggleBookReadStatus(bookID: string, bookReadStatus: boolean): Promise<APIResponse>
}

export default class ToggleBookReadStatus {
    private gateway: IBookGateway
    constructor(gateway: IBookGateway) {
        this.gateway = gateway
    }

    public async invoke(bookID: string, bookReadStatus: boolean): Promise<APIResponse> {
        const toggleReadStatus = !bookReadStatus
        return await this.gateway.toggleBookReadStatus(bookID, toggleReadStatus)
    }
}