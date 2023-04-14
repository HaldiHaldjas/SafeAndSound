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
import {database} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";




export default function SeeOffers2() {

    const [offers, setOffers] = useState([]);



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
                header: "Offer",
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
                        header: 'From',
                        accessorKey: 'from.address'
                    },
                    {
                        header: 'To',
                        accessorKey: 'to.address'
                    },
                    {
                        accessorKey: "day",
                        header: "Day",
                    },
                    {
                        header: 'Timeframe 1',
                        accessorKey: 'timeframe_1'
                    },
                    {
                        header: 'Timeframe 2',
                        accessorKey: 'timeframe_2'
                    },
                    {
                        header: 'Free seats',
                        accessorKey: 'needed_spots'
                    },
                    {
                        header: 'Price',
                        accessorKey: 'price'
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
                const handleDeactivate = () => {
                    table.getSelectedRowModel().flatRows.map((row) => {
                        alert('deactivating ' + row.getValue('name'));
                    });
                };

                const handleActivate = () => {
                    table.getSelectedRowModel().flatRows.map((row) => {
                        alert('activating ' + row.getValue('name'));
                    });
                };

                const handleContact = () => {
                    table.getSelectedRowModel().flatRows.map((row) => {
                        alert('contact ' + row.getValue('name'));
                    });
                };

                return (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button
                            color="error"
                            disabled={!table.getIsSomeRowsSelected()}
                            onClick={handleDeactivate}
                            variant="contained"
                        >
                            Deactivate
                        </Button>
                        <Button
                            color="success"
                            disabled={!table.getIsSomeRowsSelected()}
                            onClick={handleActivate}
                            variant="contained"
                        >
                            Activate
                        </Button>
                        <Button
                            color="info"
                            disabled={!table.getIsSomeRowsSelected()}
                            onClick={handleContact}
                            variant="contained"
                        >
                            Contact
                        </Button>
                    </div>
                );
            }}
        />
    );
};