import React from 'react';
import { assets } from '../assets/assets';

const StarRating = ({ rating = 0 }) => { // Default to 0 to properly show empty if no rating
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5; // Check if there's a half star

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <img
          key={i}
          src={assets.starIconFilled}
          alt="star-icon-filled"
          className='w-4.5 h-4.5 inline-block' // Added inline-block for better spacing
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      // Half star (assuming you have a half-star icon in your assets)
      // If you don't have a specific half-star icon, you might approximate
      // with a filled star and a partially transparent overlay, or just
      // round to nearest full star for display.
      // For this example, let's assume you have assets.starIconHalf
      // If not, you can modify the logic to round to the nearest whole number.
      stars.push(
        <img
          key={i}
          src={assets.starIconHalf || assets.starIconOutlined} // Use half-star if available, else outlined
          alt="star-icon-half"
          className='w-4.5 h-4.5 inline-block'
        />
      );
    } else {
      // Outlined star
      stars.push(
        <img
          key={i}
          src={assets.starIconOutlined}
          alt="star-icon-outlined"
          className='w-4.5 h-4.5 inline-block'
        />
      );
    }
  }

  return (
    <div className="flex items-center"> {/* Added a div to contain stars and align them */}
      {stars}
    </div>
  );
};

export default StarRating;