import {useEffect, useState} from "react";
import './App.css';
import {Auth} from "./components/auth";
import { database } from "./config/firebase";
import {getDocs, collection, addDoc} from "firebase/firestore"


// my comment
function App() {
    const [users, setUsers] = useState([]);

    const [newFirstName, setNewFirstName] = useState("")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newPhone, setNewPhone] = useState(0)
    const [isNewUserDriver, setIsNewUserDriver] = useState(false)




    const usersCollectionRef = collection(database, "users")
    const getUsersList = async () => {
        //read data from firebase, set the users list
        try {
            const data = await getDocs(usersCollectionRef)
            const filteredData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id}))
            console.log(filteredData)
            setUsers(filteredData)
        } catch (err) {
            console.error(err)
        }

    }
    useEffect(() => {

        getUsersList()
    }, [])

    const onSubmitUser = async () => {
        try {
        await addDoc(usersCollectionRef, {
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail,
            phone: newPhone,
            driver: isNewUserDriver
        });
        getUsersList();
        } catch (err) {
            console.error(err)
        }
    }
  return (
    <div className="App">
      <header>
        <h1>Safe and sound</h1>
      </header>
      <main>
        <div>
        <Auth></Auth>
            <div>
                <input placeholder="First name" onChange={(e) => setNewFirstName(e.target.value)}/>
                <input placeholder="Last name" onChange={(e) => setNewLastName(e.target.value)}/>
                <input placeholder="Email" onChange={(e) => setNewEmail(e.target.value)}/>
                <input placeholder="Phone" type="number"onChange={(e) => setNewPhone(Number(e.target.value))}/>
                <input type="checkbox" onChange={(e) => setIsNewUserDriver(e.target.checked)}/>
                <label>I also want to be a driver</label>
                <button onClick={onSubmitUser}>Registrate</button>
            </div>
          <div>
              {users.map((user) => (
                  <div>
                      <p>{user.first_name}</p>
                      <p>{user.last_name}</p>
                  </div>
                  ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
