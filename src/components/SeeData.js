import React, { useState, useEffect } from 'react';
import { database } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import  Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

function App() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchOffers() {
        const querySnapshot = await getDocs(collection(database, "offers"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        console.log(newData);
        setOffers(newData);
        setLoading(false); // set loading state to false when data is fetched
    }

    useEffect(() => {
        fetchOffers();
    }, []);

    return (
        <div className="App">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From</TableCell>
                                <TableCell>To</TableCell>
                                <TableCell>Timeframe 1</TableCell>
                                <TableCell>Timeframe 2</TableCell>
                                <TableCell>Free Spots</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Verification Code</TableCell>
                                <TableCell>My choice</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {offers.map((offer) => (
                                <TableRow key={offer.id}>
                                    <TableCell>{offer.from && offer.from._lat}, {offer.from && offer.from._long}</TableCell>
                                    <TableCell>{offer.to && offer.to._lat}, {offer.to && offer.to._long}</TableCell>
                                    <TableCell>{offer.timeframe_1}</TableCell>
                                    <TableCell>{offer.timeframe_2}</TableCell>
                                    <TableCell>{offer.free_spots}</TableCell>
                                    <TableCell>{offer.price}</TableCell>
                                    <TableCell>{offer.verif_code}</TableCell>
                                    <TableCell><Checkbox /></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#F8F8F8",
                            color: "#383838",
                            "&:hover": {
                                backgroundColor: "#fff",
                                color: "#3c52b2",
                            },
                        }}>Confirm my choice</Button>
                </>
            )}
        </div>
    );
}

export default App;
