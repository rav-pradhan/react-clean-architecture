import BookRequest from "../domain/BookRequest";
import { APIResponse } from "../repository/types/APIResponse";
import MockBookRepository from "./mocks/MockBookRepository";
import RecordBook from "./RecordBook";

describe("RecordBook usecase", () => {
  test("the invoke method returns the correct status code on successful repository call", async () => {
    const AValidBookRequest: BookRequest = new BookRequest(
      "A Clash of Kings",
      "George R. R. Marting",
      "The second book in the series"
    );

    (await new RecordBookTester()
                .WhenInvokeIsCalledWith(AValidBookRequest))
                .ThenTheRepositoryRecordMethodShouldBeCalled()
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
  private repository: MockBookRepository;
  private response!: APIResponse;

  constructor() {
    this.repository = new MockBookRepository();
    this.usecase = new RecordBook(this.repository);
  }

  public async WhenInvokeIsCalledWith(request: BookRequest) {
    this.response = await this.usecase.invoke(request);
    return Promise.resolve(this);
  }

  public ThenTheRepositoryRecordMethodShouldBeCalled() {
    expect(this.repository.recordBookCalls).toEqual(1);
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
