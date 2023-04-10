import React, {useState} from "react";
import {doc, getDocs, collection} from "firebase/firestore";
import {database} from "../config/firebase";

// import { DataGrid } from '@mui/x-data-grid';
// import {Signin} from "./Signin";
// import { useLocation } from 'react-router-dom'; // where do we use user location?
// import { Link } from "react-router-dom";
// Next button is for seeing driver profile
import Button from "@mui/material/Button";
import Profile from "./Profile";
// import checkbox from mui;


export default function SeeRequestsForm() {
    // const [requests, setRequests] = useState("")
    const [newDate, setNewDate] = useState("")
    const [newPlaceToStart, setNewPlaceToStart] = useState("")
    const [newPlaceToGo, setNewPlaceToGo] = useState("")
    const [newTimeToGo, setNewTimeToGo] = useState("")
    const [newTimeToArrive, setNewTimeToArrive] = useState(0)
    const [newNeededSpots, setNewNeededSpots] = useState(false)
    // const [seeDriverProfile, setSeeDriverProfile] = useState(false)
    // const [submitAccept, setSubmitAccept] = useState("")
    // const [requestPosition - järjekorranumber tabelis']
    //  const requestsRequestIdCollectionRef = collection(database, "requests") // see request list from database
    // function compareOffersAndRequests (if requestId.newPlaceToStart !== offerId.newPlaceToStart) => alert("Did not find any match! New search")
    // (if requestId.newPlaceToStart === offerId.newPlaceToStart) => {returns offerinfo(offerID), drivers profile link }
    // const retrieveDriverProfile = collection(database, "requestDriverProfile") // gets drivers profile from database



    const getRequests = async () => {

        try {
            const requestRef = collection(database, "requests"); // request id
            console.log(requestRef)
            const requestDoc = await getDocs(requestRef);


            if (requestDoc.empty) {
                console.log("We did not find any matching requests");
            } else {
                requestDoc.forEach((doc) => {
                    const docData = doc.data();
                    setNewDate(docData.date)


                })}
 /*               const requestData = requestDoc.data();
                console.log(requestRef)
                setNewDate(requestData.date)
                setNewPlaceToStart(requestData.from)
                setNewPlaceToGo(requestData.to)
                setNewTimeToGo(requestData.timeframe_1)
                setNewTimeToArrive(requestData.timeframe_2)
                setNewNeededSpots(requestData.needed_spots)
                // setSeeDriverProfile(userData.last_name) // we could use a username here
*/

        }
        catch (err)
            {
                console.error(err);
            }
        }
    getRequests()
        .then()

    console.log(newDate)
    return (
        <div>
          {/*  <p>
                <SeeRequestsForm>{getRequests} </SeeRequestsForm>

                </p>*/}
            {/*<p><label>Date: </label> {newDate}</p>*/}
            {/*<p><label>From: </label> {newPlaceToStart}</p>*/}
            {/*<p><label>To: </label> {newPlaceToGo}</p>*/}
            {/*<p><label>Time to go: </label> {newTimeToGo}</p>*/}
            {/*<p><label>Time to arrive: </label> {newTimeToArrive}</p>*/}
            {/*<p><label>Needed spots: </label> {newNeededSpots}</p>*/}
            {/*<p><label>Driver's profile </label> {Profile}</p>*/}
        </div>

    )
}




/*const columns = [
    { field: 'id', headerName: 'ID', width: 70 {document.id}},
    { field: 'from', headerName: 'Place to start', width: 130 }, // type coordinates
    { field: 'to', headerName: 'Place to go', width: 130 }, // type coordinates
    { field: 'leaving', headerName: 'Time to leave', width: 70 }, // type time
    { field: 'arriving', headerName: 'Time to arrive', width: 70 }, // type time
    { field: 'price', headerName: 'Price/Cost', width: 70 }, // number + "eur"
    { field: 'driver', headerName: "Driver's profile", width: 70 },
    { field:"checkbox", headerName: "check me", width: 20},
    ]
        /!*<Checkbox // input type="checkbox"
        color="primary"
        indeterminate={numSelected > 0 && numSelected < rowCount}
        // checked={choosedriver}
        inputProps={{
            'aria-label': 'choose driver',
        }}/>*!/

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },

];*/

/*export default function DataTable()
{
   /!* return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    );*!/
}*/

