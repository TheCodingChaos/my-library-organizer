import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// StarRating component using Unicode stars
function StarRating({ rating, onRate }) {
  const [hover, setHover] = useState(0);
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: onRate ? 'pointer' : 'default', fontSize: '24px' }}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => onRate && setHover(star)}
          onMouseLeave={() => onRate && setHover(0)}
        >
          {star <= (hover || rating) ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

function BookCard({ book, onRate }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Published Year: {book.published_year}</p>
    <div className="rating-section">
        <p>Your Rating: {book.userRating || 'N/A'}</p>
        <p>Global Rating: {book.globalRating || book.rating || 'N/A'}</p>
        {onRate && (
          <StarRating
            rating={book.userRating || 0}
            onRate={(newRating) => onRate(book.id, newRating)}
          />
        )}
    </div>
      <Link to={`/books/${book.id}`} className="btn">
        View Details
      </Link>
    </div>
  );
}

export default BookCard;