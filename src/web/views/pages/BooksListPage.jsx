/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";

export default ({ Layout, fetchBooks, toggleBookReadStatus }) => {
  return () => {
    const [isLoading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(() => {
      fetchBooks.invoke().then((res) => {
        setBooks(res);
        setLoading(true);
      });
    }, [setBooks]);

    const renderBooksList = () => (
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} - {book.author} (read? {renderReadStatus(book)})
          </li>
        ))}
      </ul>
    )

    const renderReadStatus = (book) => (
      <input onClick={() => toggleBookReadStatus.invoke(book.id, book.hasRead)} type="checkbox" defaultChecked={book.hasRead} value={book.hasRead}/>
    )

    return (
      <Layout>
        <h2>Books</h2>
        {isLoading ? renderBooksList() : <p>Loading...</p>}
      </Layout>
    );
  };
};
