import BookCard from "./BookCard";
import { useBooksPerShelf } from "../hooks/useBooksPerShelf";
import "./Bookshelf.css";
import type { Book } from "../types/Book";

type Props = {
  books: Book[];
};

const Bookshelf = ({ books }: Props) => {
  const booksPerShelf = useBooksPerShelf();
  const shelves = [];

  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  return (
    <div className="bookshelf">
      {shelves.map((shelfBooks, index) => (
        <div key={index} style={{ position: "relative" }}>
          <div className="book-row">
            {shelfBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <div className="shelf" />
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
