import Book from "../domain/Book";
import { APIResponse } from "../gateway/types/APIResponse";
import MockBookGateway from "./mocks/MockBookGateway";
import ChangeBookDetails from "./ChangeBookDetails";

describe("ChangeBookDetails usecase", () => {
  test("the invoke method returns the correct status code on successful repository call", async () => {
    (await new ChangeBookDetailsTester()
                .WhenARequestIsMadeToUpdateBookDetails())
                .ThenTheGatewayChangeBookDetailsMethodShouldBeCalledOnce()
                .AndASuccessfulResponseShouldBeProvided();
  });
});

class ChangeBookDetailsTester {
  private usecase: ChangeBookDetails;
  private repository: MockBookGateway;
  private response!: APIResponse;

  constructor() {
    this.repository = new MockBookGateway();
    this.usecase = new ChangeBookDetails(this.repository);
  }

  public async WhenARequestIsMadeToUpdateBookDetails() {
    const book = new Book(
      "123456",
      "a-game-of-thrones",
      "A Game of Thrones",
      "Georgey Boy",
      "Test notes"
    );
    this.response = await this.usecase.invoke(book);
    return this;
  }

  public ThenTheGatewayChangeBookDetailsMethodShouldBeCalledOnce() {
    expect(this.repository.changeBookCalls).toEqual(1);
    return this;
  }

  public AndASuccessfulResponseShouldBeProvided(): void {
    const successResponse: APIResponse = {
      code: 200,
      message: "Book details updated",
    };
    expect(this.response).toEqual(successResponse);
  }
}
