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
import {useLocation, useNavigate} from "react-router-dom";



export default function SeeRequests1() {

    const location = useLocation();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const userId = location.state.userId;



    async function fetchRequests() {
        const querySnapshot = await getDocs(collection(database, "requests"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setRequests(newData);
    }



    useEffect(() => {
        fetchRequests();

    }, [])



    const columns = useMemo(
        () => [

            {
                id: "Here we display ride requests from users",
                header: "Requests",
                columns: [
                    {
                        accessorFn: (row) => `${row.user_first_name} ${row.user_last_name}`, //accessorFn used to join multiple data into a single cell
                        id: 'name', //id is still required when using accessorFn instead of accessorKey
                        header: 'User',
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
                        accessorKey: 'from'
                    },
                    {
                        header: 'To',
                        accessorKey: 'to'
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
                        header: 'Seats needed',
                        accessorKey: 'needed_spots'
                    },

                    {
                        header: 'Verification code',
                        accessorKey: 'randomId'
                    },
                ]

            }


        ]
    )




    return (
        <MaterialReactTable
            columns={columns}
            data={requests}
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
                            variant="contained"
                            onClick={() => {
                                navigate("/seerequests/confirmation",
                                    { state: { selectedRequest: table.getSelectedRowModel().flatRows[0]._valuesCache }});
                            }}
                        >
                            Confirm choice
                        </Button>
                        <Button
                            color="info"
                            variant="contained"
                            onClick={() => {
                                navigate("/request",
                                    { state: { userId: userId, isSignedIn: true } });
                            }}
                        >
                            Insert a request
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