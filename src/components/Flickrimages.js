import React from 'react';

const Flickrimages = ({ picture: { id, farm, server, secret } }) => {
    return (
        <img alt="abc" className="flickrimg" src={'https://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '.jpg'} />
    )
}

export default Flickrimages