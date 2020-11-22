/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";

export default ({ Layout, fetchBooks, toggleBookReadStatus }) => {
  return () => {
    const [isLoading, setLoading] = useState(true);
    const [books, setBooks] = useState([]);

    useEffect(() => {
      fetchBooks.invoke().then((res) => {
        setBooks(res);
        setLoading(false);
      });
    }, [setBooks]);

    const renderBooksList = () => (
      <ul>
        {books.map((book) => (
          <li className="books-list__row" key={book.id}>
            <p>{book.title} - {book.author}</p> 
            <p>({renderReadStatus(book)})</p>
          </li>
        ))}
      </ul>
    );

    const renderReadStatus = (book) => (
      <label><span className="visually-hidden">{`Has read ${book.title}`}</span>
        <input
          onClick={() => toggleBookReadStatus.invoke(book.id, book.hasRead)}
          type="checkbox"
          defaultChecked={book.hasRead}
          value={book.hasRead}
        />
      </label>
    );

    return (
      <Layout>
        {isLoading ? <p>Loading...</p> : renderBooksList()}
      </Layout>
    );
  };
};
