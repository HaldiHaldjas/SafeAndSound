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
import { useNavigate} from "react-router-dom";
import img5 from "../images/img5.jpg";

function App() {

    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);


    const handleCheckbox = (event, id) => {
        if (event.target.checked) {
            setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
            setSelectedOffer(offers.find((offer) => offer.id === id));

        } else {
            setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((selectedId) => selectedId !== id));
            setSelectedOffer(null);
        }
    };
    async function fetchOffers() {
        const querySnapshot = await getDocs(collection(database, "offers"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setOffers(newData);
        setLoading(false); // set loading state to false when data is fetched
    }
    useEffect(() => {
        fetchOffers();
    }, []);

    const submit = () => {
        navigate("/seeOffers/confirmation", { state: { selectedOffer: selectedOffer } });
    }

    return (
        <div style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${img5})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            height: "100vh"
        }}>
            <div
                style={{
                    width: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "20px",
                    padding: "8px",
                    marginTop: "1px",
                    marginLeft: "40px",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
        <div className="App">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>Here we display offers from verified drivers</h3>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>From:</TableCell>
                                <TableCell>To:</TableCell>
                                <TableCell>Timeframe 1</TableCell>
                                <TableCell>Timeframe 2</TableCell>
                                <TableCell>Free spots</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Verification code</TableCell>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {offers.map((offer) => (
                                <TableRow key={offer.id}>
                                    <TableCell>{offer.from && offer.from.address}</TableCell>
                                    <TableCell>{offer.to && offer.to.address}</TableCell>
                                    <TableCell>{offer.timeframe_1}</TableCell>
                                    <TableCell>{offer.timeframe_2}</TableCell>
                                    <TableCell>{offer.free_spots}</TableCell>
                                    <TableCell>{offer.price}€</TableCell>
                                    <TableCell>{offer.verif_code}</TableCell>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedIds.includes(offer.id)}
                                            onChange={(event) => handleCheckbox(event, offer.id)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Button
                        variant="contained"
                        onClick={submit}
                    >
                        Confirm my choice
                    </Button>
                </>
            )}
        </div>
        </div>
        </div>
    );
}
export default App;
