import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const brewDetails = () => { 
    const params = useParams();
    const [brewery, setBrewery] = useState(null);
    const googleurl = brewery ? `https://maps.google.com/maps?q=${brewery.city},${brewery.state_province}&z=15&output=embed` : '';

    useEffect(() => {
        const getBreweryDetails = async () => {
            const response = await fetch(`https://api.openbrewerydb.org/v1/breweries?by_name=${params.symbol}&per_page=1`);
            const json = await response.json();
            setBrewery(json[0]);
        };
        getBreweryDetails().catch(console.error);
    }, []);

    return (
        <div>
            {brewery && (
                <>
                    <h2>{brewery.name}</h2>
                    <p>URL: {brewery.website_url}</p>
                    <p>Address: {brewery.address_1}, {brewery.city}, {brewery.state_province} {brewery.postal_code}, {brewery.country}</p>
                    <iframe src={googleurl}></iframe>
                </>
            )}
        </div>
    );
};

export default brewDetails;