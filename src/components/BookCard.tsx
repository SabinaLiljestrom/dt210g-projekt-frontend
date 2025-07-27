import type { Book } from "../types/Book";
import "./BookCard.css";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  const { title, authors } = book;

  return (
    <div className="book-card">
      <div className="book-card__info">
        <h3>{title}</h3>
        {authors.length > 0 && <p>{authors.join(", ")}</p>}
      </div>
    </div>
  );
};

export default BookCard;
