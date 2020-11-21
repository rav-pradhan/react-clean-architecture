import Book from "../domain/Book"
import FetchBooks from "./FetchBooks"
import MockBookGateway from "./mocks/MockBookGateway"

describe("FetchBooks usecase", () => {
  test("the invoke method returns the correct status code on successful gateway call", async () => {
    (await new FetchBooksTester()
              .WhenInvokeIsCalled())
              .ThenTheGatewayFetchMethodShouldBeCalled()
              .AndTheResponseShouldBeAllBooks()
  })
})

class FetchBooksTester {
  private usecase: FetchBooks
  private gateway: MockBookGateway
  private response!: Book[]

  constructor() {
    this.gateway = new MockBookGateway()
    this.usecase = new FetchBooks(this.gateway)
  }

  public async WhenInvokeIsCalled() {
    const response = await this.usecase.invoke()
    this.response = response || []
    return Promise.resolve(this)
  }

  public ThenTheGatewayFetchMethodShouldBeCalled() {
    expect(this.gateway.fetchBooksCalls).toEqual(1)
    return this
  }

  public AndTheResponseShouldBeAllBooks(): void {
    const books: Array<Book> = [
      new Book("123456", "a-game-of-thrones", "A Game of Thrones", "George R. R. Martin", "A Game of Thrones is the first book of the epic fantasy series, 'A Song of Ice and Fire'", false),
      new Book("abcdef", "code-complete", "Code Complete", "Steve McConnell", "A practical handbook of software construction", false),
      new Book("xyz123", "a-test", "A T", "Testy McTestface", "!", false)
    ]
    expect(this.response).toEqual(books)
  }

  public AndTheResponseShouldBeUndefined() {
    expect(this.response).toBeUndefined()
  }
}
