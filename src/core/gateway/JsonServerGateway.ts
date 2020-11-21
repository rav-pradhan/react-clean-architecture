import Book from "../domain/Book";
import { APIResponse } from "./types/APIResponse";
import BookRequest from "../domain/BookRequest";
import IBookGateway from "./IBookGateway";

export default class JsonServerBookGateway implements IBookGateway {
    private BASE_API_URL: string = "http://localhost:3000"

    public async fetchBooks(): Promise<Book[]> {
        const response = await (fetch(`${this.BASE_API_URL}/books`))
        return response ? this.buildBooksList(await response.json()) : []
    }

    public async recordBook(request: BookRequest): Promise<APIResponse> {
        const response = await fetch(`${this.BASE_API_URL}/books`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
        return this.buildResponse(response)
    }

    public async pickUpBook(slug: string): Promise<Book> {
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
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hasRead: newBookReadStatus
            })
        })
        return this.buildResponse(response)
    }

    private buildBooksList(response: Array<Book>): Array<Book> {
        const books: Array<Book> = []
        response.forEach(book => {
            books.push(new Book(book.id, book.slug, book.title, book.author, book.notes, book.hasRead))
        })
        return books
    }

    private buildResponse(response: Response): APIResponse {
        const apiResponse: APIResponse = {
            code: response.status,
            message: response.statusText
        }
        return apiResponse
    }
}