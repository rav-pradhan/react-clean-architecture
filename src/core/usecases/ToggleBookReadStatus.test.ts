import Book from "../domain/Book";
import BookRequest from "../domain/BookRequest";
import { APIResponse } from "../repository/types/APIResponse";
import MockBookRepository from "./mocks/MockBookRepository";
import ToggleBookReadStatus from "./ToggleBookReadStatus";

describe("ToggleBookReadStatus usecase", () => {
  test("that a request to mark book as read is accepted", async () => {
    const finishedBook = new Book("123456", "a-game-of-thrones", "A Game of Thrones", "Georgey Boy", "Test notes");

    (await new ToggleBookReadStatusTester()
                .GivenTheUsecaseIsInvoked(finishedBook.id, finishedBook.hasRead))
                .ThenTheToggleBookReadStatusMethodShouldBeCalled()
                .AndASuccessfulResponseShouldBeReceived()
  })
})

class ToggleBookReadStatusTester {
  private usecase: ToggleBookReadStatus;
  private repository: MockBookRepository;
  private response!: APIResponse;

  constructor() {
    this.repository = new MockBookRepository();
    this.usecase = new ToggleBookReadStatus(this.repository);
  }

  public async GivenTheUsecaseIsInvoked(bookID: string, currentBookStatus: boolean) {
    this.response = await this.usecase.invoke(bookID, currentBookStatus);
    return Promise.resolve(this);
  }

  public ThenTheToggleBookReadStatusMethodShouldBeCalled() {
    expect(this.repository.toggleBookReadStatusCalls).toEqual(1);
    return this;
  }

  public AndASuccessfulResponseShouldBeReceived(): void {
    const successResponse: APIResponse = {
      code: 200,
      message: "Book read status updated",
    };
    expect(this.response).toEqual(successResponse);
  }
}
