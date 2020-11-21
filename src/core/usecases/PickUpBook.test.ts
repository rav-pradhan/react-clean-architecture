import Book from "../domain/Book"
import MockBookRepository from "../services/mocks/MockBookRepository"
import PickUpBook from "./PickUpBook"

describe("PickUpBook usecase", () => {
  test("the invoke method returns the correct status code on successful repository call", async () => {
    (await new PickUpBookTester()
              .WhenInvokeIsCalledWithAnIDOf("abcdef"))
              .ThenTheRepositoryFetchMethodShouldBeCalled()
              .AndTheResponseShouldBeThatBook()
  })
  test("an undefined call is returned if the book is not found", async () => {
    (await new PickUpBookTester()
              .WhenInvokeIsCalledWithAnIDOf("00000"))
              .ThenTheRepositoryFetchMethodShouldBeCalled()
              .AndTheResponseShouldBeUndefined()
  })
})

class PickUpBookTester {
  private usecase: PickUpBook
  private repository: MockBookRepository
  private response: Book|undefined

  constructor() {
    this.repository = new MockBookRepository()
    this.usecase = new PickUpBook(this.repository)
  }

  public async WhenInvokeIsCalledWithAnIDOf(bookID: string) {
    const response = await this.usecase.invoke(bookID)
    if (response) {
      this.response = new Book(response.id, response.slug, response.title, response.author, response.notes)
    }
    return Promise.resolve(this)
  }

  public ThenTheRepositoryFetchMethodShouldBeCalled() {
    expect(this.repository.fetchBookCalls).toEqual(1)
    return this
  }

  public AndTheResponseShouldBeThatBook(): void {
    expect(this.response).toEqual(new Book("abcdef", "code-complete", "Code Complete", "Steve McConnell", "A practical handbook of software construction"))
  }

  public AndTheResponseShouldBeUndefined() {
    expect(this.response).toBeUndefined()
  }
}
