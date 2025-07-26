import type { Book } from "../types/Book";
import "./BookCard.css";

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  if (!book.volumeInfo) return null;
  const { title, authors, imageLinks } = book.volumeInfo;
  const image = imageLinks?.thumbnail;
  console.log("BookCard:", book);

  return (
    <div className="book-card">
      {image ? (
        <img src={image} alt={title} className="book-card__image" />
      ) : (
        <div className="book-card__placeholder">Ingen bild</div>
      )}
      <div className="book-card__info">
        <h3>{title}</h3>
        {authors && <p>{authors.join(", ")}</p>}
      </div>
    </div>
  );
};

export default BookCard;
