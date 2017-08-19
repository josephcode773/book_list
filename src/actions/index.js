export function selectBook(book) {
  // selectBook is an ActionCreator, it needs to retun an action,
  // an object with a type property.
  // Aways Returns type and payload
  return {
    type: "BOOK_SELECTED",
    payload: book
  };
}
