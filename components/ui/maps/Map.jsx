import React from 'react'

function Map({className}) {
    const searchQuery = "haram ,Giza, Egypt";
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&output=embed`;
    return (
        <iframe className={`map ${className} rounded-3xl`} title="Map" src={mapUrl} width="100%" height="400px" ></iframe>
    )
}

export default Map