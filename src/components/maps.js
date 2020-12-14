import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '500px'
};

export class Maps extends Component {



    render() {

        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                onClick={this.props.onClick}
                getPositions={this.props.getPositions}

            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyATw4jM4HDy64FyQUz-tWBY3gTCSv7q7h8'
})(Maps);