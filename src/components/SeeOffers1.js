import React, {useEffect, useMemo, useState} from "react";
import MaterialReactTable from 'material-react-table';
import {collection, getDocs} from "firebase/firestore";
import {database} from "../config/firebase";


export default function SeeOffers1() {



    const [offers, setOffers] = useState([]);
    const data = offers
    console.log(data)
    async function fetchOffers() {
        const querySnapshot = await getDocs(collection(database, "offers"));
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setOffers(newData);

    }

    useEffect(() => {
        fetchOffers();
    }, []);

    //simple column definitions pointing to flat data
    const columns = useMemo(
        () => [
            {
                header: 'Day',
                accessorKey: 'day',
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
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
                header: 'Driver',
                accessorKey: 'Driver'
            },
        ],
        [],
    );

    return (
        <MaterialReactTable
            columns={columns}
            data={data}
            enableRowSelection //enable some features
            enableColumnOrdering
            enableGlobalFilter={false} //turn off a feature
        />
    );

}

