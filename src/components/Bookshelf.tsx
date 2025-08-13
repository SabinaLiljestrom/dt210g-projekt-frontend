import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import { useBooksPerShelf } from "../hooks/useBooksPerShelf";
import "./Bookshelf.css";
import type { Book } from "../types/Book";

type Props = { books: Book[] };

const Bookshelf = ({ books }: Props) => {
  const booksPerShelf = useBooksPerShelf();
  const shelves: Book[][] = [];

  for (let i = 0; i < books.length; i += booksPerShelf) {
    shelves.push(books.slice(i, i + booksPerShelf));
  }

  return (
    <div className="bookshelf">
      {shelves.map((shelfBooks, index) => (
        <div key={index} className="book-shelf-wrapper">
          <div className="book-row">
            {shelfBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="book-wrapper"
              >
                {book.thumbnail ? (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="book-image"
                  />
                ) : (
                  <div className="book-placeholder">Ingen bild</div>
                )}
              </Link>
            ))}
          </div>

          <div className="shelf" />

          <div className="book-info-row">
            {shelfBooks.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="book-info-link"
              >
                <BookCard book={book} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookshelf;
