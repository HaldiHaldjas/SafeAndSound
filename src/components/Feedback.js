import React, { useState } from 'react';

function Feedback() {
    const [rating, setRating] = useState(0);

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Thank you for rating your experience as ${rating}.`);
    };

    return (
        <div>
            <h1>Feedback</h1>
            <p>Info - thank you for using</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Rate your experience:
                    <input type="number" min="0" max="5" value={rating} onChange={handleRatingChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
            <h2>History</h2>
            <p>Display user's history here.</p>
            <h2>Profile</h2>
            <p>Display user's profile information here.</p>
        </div>
    );
}

export default Feedback;
