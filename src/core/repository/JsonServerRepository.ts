import Book from "../domain/Book";
import { APIResponse } from "./types/APIResponse";
import IBookRepository from "./IBookRepository";

export default class JsonServerBookRepository implements IBookRepository {
    private BASE_API_URL: string = "localhost:3000"
    
    public async store(request: Book): Promise<APIResponse> {
        const response = await fetch(`${this.BASE_API_URL}/books`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
        return this.buildResponse(response)
    }

    public async fetchBook(slug: string): Promise<Book> {
        const response = await fetch(`${this.BASE_API_URL}/books/${slug}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
        })
        return response.json()
    }

    public async updateBook(bookDetails: Book): Promise<APIResponse> {
        const response = await fetch(`${this.BASE_API_URL}/books/${bookDetails.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDetails)
        })
        return this.buildResponse(response)
    }

    public async toggleBookReadStatus(bookID: string, newBookReadStatus: boolean): Promise<APIResponse> {
        const response = await fetch(`${this.BASE_API_URL}/books/${bookID}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBookReadStatus)
        })
        return this.buildResponse(response)
    }

    private buildResponse(response: Response): APIResponse {
        const apiResponse: APIResponse = {
            code: response.status,
            message: response.statusText
        }
        return apiResponse
    }
}