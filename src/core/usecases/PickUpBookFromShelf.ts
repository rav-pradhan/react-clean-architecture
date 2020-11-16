import Book from "../domain/Book";

export default interface PickUpBookFromShelf {
    pickUpBookFromShelf(id: string): Promise<Book>
}