import React, { useState, Component } from 'react';
import {addDoc, collection, getDocs} from "firebase/firestore";
import {database} from "../config/firebase";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import Autocomplete from './Autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

class RequestForm1 extends Component {
    static propTypes = {
        google: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    componentDidMount() {
        const { google } = this.props;
        const autocomplete = new google.maps.places.Autocomplete(
            this.inputRef.current,
            { componentRestrictions: { country: 'ee' } }
        );
        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            // Log the latitude and longitude of the selected place
            console.log(place.geometry.location.lat());
            console.log(place.geometry.location.lng());
        });
    }


    render() {
        return (
            <div>
                <Autocomplete inputRef={this.inputRef} />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDAjrgSjkzIiZj_OX2KnhdA5mWNLtWsalI'
})(RequestForm1);
