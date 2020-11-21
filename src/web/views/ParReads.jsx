/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import "../App.css";
import _DefaultLayout from "./layouts/DefaultLayout";
import _BooksListPage from "./pages/BooksListPage";

export default ({
  Router,
  fetchBooks,
  changeBookDetails,
  pickUpBook,
  recordBook,
  toggleBookReadStatus,
}) => {
  const DefaultLayout = _DefaultLayout();

  const BooksListPage = _BooksListPage({Layout: DefaultLayout, fetchBooks, toggleBookReadStatus});

  return () => (
    <BooksListPage />
  );
};
