/* eslint-disable import/no-anonymous-default-export */
import React from "react";

export default () => ({ children }) => (
  <main className="App">
    <h1>ParReads - A Slightly Less Good Goodreads</h1>
    {children}
  </main>
);
