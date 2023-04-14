import React, {useEffect, useMemo, useState} from 'react';
import MaterialReactTable from 'material-react-table';
import {
    Box,
    Button,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
} from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import {database} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";
const [userProfiles, setUserProfiles] = useState([])



const getUserProfile = async () => {
    await getDocs(collection(database, "users"))
        .then((querySnapshot) => {
            const newData2 = querySnapshot.docs
                .map((doc) => ({...doc.data(), id: doc.id}));
            setUserProfiles(newData2); // (newData2.users.last_name)
        })
}

useEffect(() => {
    getUserProfile();
}, [])

console.log(userProfiles)

const SeeOffers2 = () => {
    const columns = useMemo(
        () => [

            {
            id: "Here we display offers from verified drivers",
            header: "Offer",
            columns: [
                {
                    accessorKey: "day",
                    header: "Day",
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
                {
                    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                    size: 250,
                    header: 'Driver',
                    Cell: ({ renderedCellValue, row }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <img
                                alt="avatar"
                                height={30}
                                src={row.original.avatar}
                                loading="lazy"
                                style={{ borderRadius: '50%' }}
                            />
                            {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                            <span>{renderedCellValue}</span>
                        </Box>
                    ),

                },
            ]

            }


        ]
    )


}