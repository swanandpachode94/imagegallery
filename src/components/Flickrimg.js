import React from 'react';
import Spinner from "./layout/Spinner";
import Flickrimages from '../components/Flickrimages';

const Flickrimg = ({ pictures: { photos: { photo } }, loading, getPositions, receivedData, currentPage }) => {
    if (loading) {
        return (<Spinner />)
    }
    else {
        return (
            <div className="imglist">
                {
                    photo.map((picture, index) => (
                        <Flickrimages key={index} picture={picture} getPositions={getPositions} receivedData={receivedData} currentPage={currentPage} />
                    )
                    )}

            </div>
        )
    }
}

export default Flickrimg