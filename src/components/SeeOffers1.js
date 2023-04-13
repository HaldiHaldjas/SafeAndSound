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
                accessorKey: 'day', //simple accessorKey pointing to flat data
                muiTableHeadCellProps: { sx: { color: 'green' } }, //custom props
            },
            {
                header: 'From',
                accessorKey: 'from.address', //simple accessorKey pointing to flat data
            },
            {
                header: 'To',
                accessorKey: 'to.address', //simple accessorKey pointing to flat data
            },
            {
                header: 'Timeframe 1',
                accessorKey: 'timeframe_1', //simple accessorKey pointing to flat data
            },
            {
                header: 'Timeframe 2',
                accessorKey: 'timeframe_2', //simple accessorKey pointing to flat data
            },
            {
                header: 'Free seats',
                accessorKey: 'needed_spots', //simple accessorKey pointing to flat data
            },
            {
                header: 'Price',
                accessorKey: 'price', //simple accessorKey pointing to flat data
            },
            {
                header: 'Driver',
                accessorKey: 'Driver', //simple accessorKey pointing to flat data
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

