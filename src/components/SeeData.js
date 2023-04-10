import React, { useState, useEffect } from 'react';
import '../App.css';
import { database } from "../config/firebase";
import { createRoot } from 'react-dom/client';

import {collection, getDocs, addDoc} from "firebase/firestore";


function App() {
    const [offers, setOffers] = useState([]);
    async function fetchOffers() {
        // const response = database.collection('Offers');
        // const data = await response.get();
        // const fetchedOffers = [];
        // data.docs.forEach(item => {
        //     fetchedOffers.push(item.data());
        // });


        await getDocs(collection(database, "offers"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id: doc.id}));
                setOffers(newData);
                console.log(offers, newData);
            })

        // console.log(fetchedOffers)
        // setOffers(fetchedOffers);
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    console.log(offers);

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
