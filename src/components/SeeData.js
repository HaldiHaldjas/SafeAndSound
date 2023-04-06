import React, { useState, useEffect } from 'react';
import '../App.css';
import { database } from "../config/firebase";

function App() {
    const [offers, setOffers] = useState([]);
    const fetchOffers = async () => {
        const response = database.collection('Offers');
        const data = await response.get();
        data.docs.forEach(item => {
            setOffers(item => [...item, item.data()]);
        });
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    return (
        <div className="App">
            {offers &&
                offers.map(offer => {
                    return (
                        <div className="offer-container" key={offer.id}>
                            <h4>{offer.title}</h4>
                            <p>{offer.body}</p>
                        </div>
                    );
                })}
        </div>
    );
}

export default App;
