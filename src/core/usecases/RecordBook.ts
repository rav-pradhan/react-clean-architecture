import BookRequest from "../domain/BookRequest";
import IBookRepository from "../repository/IBookRepository";
import { APIResponse } from "../repository/types/APIResponse";

export default class RecordBook {
    private repository: IBookRepository
    constructor(repository: IBookRepository) {
        this.repository = repository
    }

    public async invoke(request: BookRequest): Promise<APIResponse> {
        if (this.isValidRequest(request)) {
            return await this.repository.recordBook(request)
        }
        throw new Error("record book request was invalid")
    }

    private isValidRequest(request: object): boolean {
        const areTruthy = (el: string) => {return el ? true : false}
        return Object.values(request).filter(el => typeof el === "string").every(areTruthy)
    }
}
