import React, {useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
    Avatar,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import { database } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate, useLocation} from "react-router-dom";



export default function SeeOffers2() {

    const location = useLocation();
    const navigate = useNavigate();
    const [offers, setOffers] = useState([]);
    const userId = location.state.userId;

    async function fetchOffers() {
        const querySnapshot = await getDocs(collection(database, "offers"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setOffers(newData);
    }



    useEffect(() => {
        fetchOffers();

    }, [])



        const columns = useMemo(
            () => [

                {
                id: "Here we display offers from verified drivers",
                header: "Offers",
                columns: [
                    {
                     accessorFn: (row) => `${row.user_first_name} ${row.user_last_name}`, //accessorFn used to join multiple data into a single cell
                     id: 'name', //id is still required when using accessorFn instead of accessorKey
                     header: 'Driver',
                     size: 250,
                        Cell: ({ renderedCellValue, row }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >

                            <Avatar

                                alt="avatar"
                                height={30}
                                src={row.user_profile_pic}
                                loading="lazy"
                                style={{borderRadius: '50%' }}
                            />

                            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                            <span>{renderedCellValue}</span>
                        </Box>
                    ),
                    },
                                       {
                        header: 'From:',
                        accessorKey: 'from'
                    },
                    {
                        header: 'To:',
                        accessorKey: 'to'
                    },
                    {
                        accessorKey: "day",
                        header: "Day:",
                    },
                    {
                        header: 'Starting time:',
                        accessorKey: 'timeframe_1'
                    },
                    {
                        header: 'Latest time of arrival:',
                        accessorKey: 'timeframe_2'
                    },
                    {
                        header: 'Free seats:',
                        accessorKey: 'needed_spots'
                    },
                    {
                        header: 'Price:',
                        accessorKey: 'price'
                    },
                    {
                        header: 'Verification code:',
                        accessorKey: 'randomId'
                    },
                ]
                }
            ]
        )


    return (
        <MaterialReactTable
            columns={columns}
            data={offers}
            enableColumnFilterModes
            enableColumnOrdering
            enableGrouping
            enablePinning
            enableRowActions
            enableRowSelection
            initialState={{ showColumnFilters: true }}
            positionToolbarAlertBanner="bottom"
            renderDetailPanel={({ row }) => (

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >

                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h4">Signature Catch Phrase:</Typography>
                        <Typography variant="h1">
                            &quot;{row.original.signatureCatchPhrase}&quot;
                        </Typography>
                    </Box>q
                </Box>
            )}
            renderRowActionMenuItems={({ closeMenu }) => [
                <MenuItem
                    key={0}
                    onClick={() => {
                        // View profile logic...
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    View Profile
                </MenuItem>,
                <MenuItem
                    key={1}
                    onClick={() => {
                        // Send email logic...
                        closeMenu();
                    }}
                    sx={{ m: 0 }}
                >
                    <ListItemIcon>
                        <Send />
                    </ListItemIcon>
                    Send Email
                </MenuItem>,
            ]}
            renderTopToolbarCustomActions={({ table }) => {

                return (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            color="info"
                            disabled={!table.getIsSomeRowsSelected()}
                            sx={{ fontFamily: 'monospace',
                                width: "180px",
                                height: "40px",
                                fontWeight: 600,
                                color: "#fbf6f4",
                                backgroundColor: "#896c63",
                                borderRadius: "8px"
                            }}
                            onClick={() => {
                                navigate("/seeoffers/confirmation",
                                    { state: { userId: userId,
                                            selectedOffer: table.getSelectedRowModel().flatRows[0]._valuesCache }});
                            }}
                        >
                            Confirm choice
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => {
                                navigate("/offer",
                                    { state: { userId: userId, isSignedIn: true } });
                            }}
                        >
                            Insert an offer
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => {
                                navigate("/profile",
                                    { state: { userId: userId, isSignedIn: true } });
                            }}
                        >
                            Home
                        </Button>


                    </div>
                );
            }}
        />
    );
};