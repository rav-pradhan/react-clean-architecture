import Book from "../domain/Book";
import IBookRepository from "./IBookRepository";

export default class JsonServerBookRepository implements IBookRepository {
    private BASE_API_URL: string = "localhost:3000"
    
    public async store(request: Book) {
        fetch(`${this.BASE_API_URL}/books`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        })
    }

    public async fetchBook(slug: string): Promise<Book> {
        const response = fetch(`${this.BASE_API_URL}/books/${slug}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
              },
        })
        return (await response).json()
    }

    public async updateBook(bookDetails: Book) {
        fetch(`${this.BASE_API_URL}/books/${bookDetails.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookDetails)
        })
    }
}