import BookRequest from "../domain/BookRequest";
import { APIResponse } from "../gateway/types/APIResponse";
import MockBookGateway from "./mocks/MockBookGateway";
import RecordBook from "./RecordBook";

describe("RecordBook usecase", () => {
  test("the invoke method returns the correct status code on successful gateway call", async () => {
    const AValidBookRequest: BookRequest = new BookRequest(
      "A Clash of Kings",
      "George R. R. Marting",
      "The second book in the series"
    );

    (await new RecordBookTester()
                .WhenInvokeIsCalledWith(AValidBookRequest))
                .ThenTheGatewayRecordMethodShouldBeCalled()
                .AndASuccessfulResponseShouldBeReceived();
  });

  test("error is thrown when request is invalid", async () => {
    const AnInvalidRequest: BookRequest = new BookRequest(
      "",
      "",
      ""
    );
    await new RecordBookTester().AnErrorShouldBeThrownWhenUsecaseIsInvokedWith(AnInvalidRequest)
  })
})

class RecordBookTester {
  private usecase: RecordBook;
  private gateway: MockBookGateway;
  private response!: APIResponse;

  constructor() {
    this.gateway = new MockBookGateway();
    this.usecase = new RecordBook(this.gateway);
  }

  public async WhenInvokeIsCalledWith(request: BookRequest) {
    this.response = await this.usecase.invoke(request);
    return Promise.resolve(this);
  }

  public ThenTheGatewayRecordMethodShouldBeCalled() {
    expect(this.gateway.recordBookCalls).toEqual(1);
    return this;
  }

  public AndASuccessfulResponseShouldBeReceived(): void {
    const successResponse: APIResponse = {
      code: 201,
      message: "Book created",
    };
    expect(this.response).toEqual(successResponse);
  }

  public AndTheResponseShouldBeUndefined() {
    expect(this.response).toBeUndefined();
  }

  public async AnErrorShouldBeThrownWhenUsecaseIsInvokedWith(request: BookRequest) {
    await expect(this.usecase.invoke(request)).rejects.toThrow()
  }
}
