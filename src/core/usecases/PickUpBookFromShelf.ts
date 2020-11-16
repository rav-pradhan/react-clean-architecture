import Book from "../domain/Book";

export default interface PickUpBookFromShelf {
    pickUpBookFromShelf(bookSlug: string): Promise<Book>
}