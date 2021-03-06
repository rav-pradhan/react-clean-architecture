import Book from "../domain/Book"
import MockBookGateway from "./mocks/MockBookGateway"
import PickUpBook from "./PickUpBook"

describe("PickUpBook usecase", () => {
  test("the invoke method returns the correct status code on successful gateway call", async () => {
    (await new PickUpBookTester()
              .WhenInvokeIsCalledWithAnIDOf("abcdef"))
              .ThenTheGatewayFetchMethodShouldBeCalled()
              .AndTheResponseShouldBeThatBook()
  })
  test("an undefined call is returned if the book is not found", async () => {
    (await new PickUpBookTester()
              .WhenInvokeIsCalledWithAnIDOf("00000"))
              .ThenTheGatewayFetchMethodShouldBeCalled()
              .AndTheResponseShouldBeUndefined()
  })
})

class PickUpBookTester {
  private usecase: PickUpBook
  private gateway: MockBookGateway
  private response: Book|undefined

  constructor() {
    this.gateway = new MockBookGateway()
    this.usecase = new PickUpBook(this.gateway)
  }

  public async WhenInvokeIsCalledWithAnIDOf(bookID: string) {
    const response = await this.usecase.invoke(bookID)
    if (response) {
      this.response = new Book(response.id, response.slug, response.title, response.author, response.notes, false)
    }
    return Promise.resolve(this)
  }

  public ThenTheGatewayFetchMethodShouldBeCalled() {
    expect(this.gateway.pickUpBookCalls).toEqual(1)
    return this
  }

  public AndTheResponseShouldBeThatBook(): void {
    expect(this.response).toEqual(new Book("abcdef", "code-complete", "Code Complete", "Steve McConnell", "A practical handbook of software construction", false))
  }

  public AndTheResponseShouldBeUndefined() {
    expect(this.response).toBeUndefined()
  }
}
