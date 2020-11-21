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
          <li key={book.id}>
            {book.title} - {book.author} ({renderReadStatus(book)})
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
        <h2>Books</h2>
        {isLoading ? <p>Loading...</p> : renderBooksList()}
      </Layout>
    );
  };
};
