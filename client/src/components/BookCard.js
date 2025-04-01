import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../App';
import './BookCard.css'

const cozyColors = [
  { background: '#d8c4a6', text: '#3b2f2f' }, // faded parchment + dark brown
  { background: '#c9b79c', text: '#2f1d1d' }, // warm beige + deep brown
  { background: '#b08968', text: '#fffaf5' }, // leather tan + soft ivory
  { background: '#a26745', text: '#fdf6ec' }, // reddish brown + cream
  { background: '#8b5e3c', text: '#f7f1e3' }, // deep wood + soft white
];

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
  const { isLoggedIn } = useContext(SessionContext);
  const [style, setStyle] = useState({});

  useEffect(() => {
    const index = book.id % cozyColors.length;
    const { background, text } = cozyColors[index];
    setStyle({
      backgroundColor: background,
      color: text
    });
  }, [book.id]);

  return (
    <div className="book-card" style = {{...style}}>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Published Year: {book.published_year}</p>
      <div className="rating-section">
        { isLoggedIn ? <p>Your Rating: {book.userRating}</p> : null }
        <p>Global Rating: {book.globalRating || book.rating || 'N/A'}</p>
        {onRate && (
          <StarRating
            rating={book.userRating || 0}
            onRate={(newRating) => onRate(book.id, newRating)}
          />
        )}
      </div>
    </div>
  );
}

export default BookCard;