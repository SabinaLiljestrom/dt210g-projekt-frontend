import { useState, useEffect } from "react";

export function useBooksPerShelf() {
  const [booksPerShelf, setBooksPerShelf] = useState(5);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 500) setBooksPerShelf(2);
      else if (width < 768) setBooksPerShelf(3);
      else if (width < 1024) setBooksPerShelf(4);
      else setBooksPerShelf(5);
    };

    update(); // initial
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return booksPerShelf;
}
