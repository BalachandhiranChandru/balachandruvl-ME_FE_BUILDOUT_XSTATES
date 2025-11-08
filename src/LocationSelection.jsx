import React, { useState, useEffect, useCallback } from 'react';

const API_ENDPOINT = 'https://location_selector.labs.crio.do';
// const API_ENDPOINT = 'https://crio-location-selector.onrender.com';

// CHANGE ONLY THIS PART :
// WRONG
// const url = `${API_ENDPOINT}/country=${countryNameEncoded}/states`;

// // FIX
// const url = `${API_ENDPOINT}/states?country=${countryNameEncoded}`;

// //  WRONG
// const url = `${API_ENDPOINT}/country=${countryNameEncoded}/state=${stateNameEncoded}/cities`;

// //  FIX
// const url = `${API_ENDPOINT}/cities?state=${stateNameEncoded}`;

function LocationSelection() {

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    const fetchData = useCallback(async (url) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setLoading(false);
            return data;
        } catch (e) {
            setError(`Failed to fetch data: ${e.message}`);
            setLoading(false);
            return [];
        }
    }, []);
    useEffect(() => {
        const getCountries = async () => {
            const data = await fetchData(`${API_ENDPOINT}/countries`);
            setCountries(data);
        };
        getCountries();
    }, [fetchData]);
    useEffect(() => {
        if (selectedCountry) {
            const getStates = async () => {
                const countryNameEncoded = encodeURIComponent(selectedCountry);
                const url = `${API_ENDPOINT}/country=${countryNameEncoded}/states`;
                // const url = `${API_ENDPOINT}/states?country=${countryNameEncoded}`;
                const data = await fetchData(url);
                setStates(data);
            };
            getStates();
        } else {
            setStates([]);
        }
        setSelectedState('');
        setSelectedCity('');
    }, [selectedCountry, fetchData]);
    useEffect(() => {
        if (selectedCountry && selectedState) {
            const getCities = async () => {
                const countryNameEncoded = encodeURIComponent(selectedCountry);
                const stateNameEncoded = encodeURIComponent(selectedState);
                const url = `${API_ENDPOINT}/country=${countryNameEncoded}/state=${stateNameEncoded}/cities`;
                // const url = `${API_ENDPOINT}/cities?state=${stateNameEncoded}`;
                const data = await fetchData(url);
                setCities(data);
            };
            getCities();
        } else {
            setCities([]);
        }
        setSelectedCity('');
    }, [selectedState, selectedCountry, fetchData]);
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };
    const selectStyle = {
        padding: '10px',
        margin: '0 10px',
        minWidth: '200px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    };
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1>Select Location</h1>
            {error && <p style={{ color: 'red' }}> Error: {error}</p>}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0' }}>
                <select
                    style={selectStyle}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    disabled={countries.length === 0}
                >
                    <option value="" disabled>Select Country</option>
                    {countries.map((country) => (
                        <option
                            key={country}
                            value={country}
                            country_name={country}
                        >
                            {country}
                        </option>
                    ))}
                </select>
                <select
                    style={selectStyle}
                    value={selectedState}
                    onChange={handleStateChange}
                    disabled={!selectedCountry || states.length === 0 || loading}
                >
                    <option value="" disabled>Select State</option>
                    {states.map((state) => (
                        <option
                            key={state}
                            value={state}
                            state_name={state}
                        >
                            {state}
                        </option>
                    ))}
                </select>
                <select
                    style={selectStyle}
                    value={selectedCity}
                    onChange={handleCityChange}
                    disabled={!selectedState || cities.length === 0 || loading}
                >
                    <option value="" disabled>Select City</option>
                    {cities.map((city) => (
                        <option
                            key={city}
                            value={city}
                            city_name={city}
                        >
                            {city}
                        </option>
                    ))}
                </select>



                {/* <select style={selectStyle}>
                    <option value="" disabled>Select Country</option>
                    <option value="USA" country_name="USA">USA</option>
                    <option value="Canada" country_name="Canada">Canada</option>
                    <option value="India" country_name="India">India</option>
                </select>
                <select style={selectStyle}>
                    <option value="" disabled>Select State</option>
                    <option value="California" state_name="California">California</option>
                    <option value="Texas" state_name="Texas">Texas</option>
                </select>
                <select style={selectStyle}>
                    <option value="" disabled>Select City</option>
                    <option value="Los Angeles" city_name="Los Angeles">Los Angeles</option>
                    <option value="San Francisco" city_name="San Francisco">San Francisco</option>
                </select> */}
            </div>
            {selectedCountry && selectedState && selectedCity && (
                <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '30px' }}>
                    You selected {selectedCity}, <span style={{color:'gray'}}>{selectedState}, {selectedCountry}</span>
                </p>
            )}
        </div>
    );
}
export default LocationSelection;





// import React, { useState, useEffect, useCallback } from 'react';

// // const API_ENDPOINT = 'https://location_selector.labs.crio.do';
// const API_ENDPOINT = 'https://crio-location-selector.onrender.com';

// function LocationSelection() {

//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);

//     const [selectedCountry, setSelectedCountry] = useState('');
//     const [selectedState, setSelectedState] = useState('');
//     const [selectedCity, setSelectedCity] = useState('');

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');


//     const fetchData = useCallback(async (url) => {
//         setLoading(true);
//         setError('');
//         try {
//             const response = await fetch(url);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setLoading(false);
//             return data;
//         } catch (e) {
//             setError(`Failed to fetch data: ${e.message}`);
//             setLoading(false);
//             return [];
//         }
//     }, []);
//     useEffect(() => {
//         const getCountries = async () => {
//             const data = await fetchData(`${API_ENDPOINT}/countries`);
//             setCountries(data);
//         };
//         getCountries();
//     }, [fetchData]);
//     useEffect(() => {
//         if (selectedCountry) {
//             const getStates = async () => {
//                 const countryNameEncoded = encodeURIComponent(selectedCountry);
//                 const url = `${API_ENDPOINT}/country=${countryNameEncoded}/states`;
//                 const data = await fetchData(url);
//                 setStates(data);
//             };
//             getStates();
//         } else {
//             setStates([]);
//         }
//         setSelectedState('');
//         setSelectedCity('');
//     }, [selectedCountry, fetchData]);
//     useEffect(() => {
//         if (selectedCountry && selectedState) {
//             const getCities = async () => {
//                 const countryNameEncoded = encodeURIComponent(selectedCountry);
//                 const stateNameEncoded = encodeURIComponent(selectedState);
//                 const url = `${API_ENDPOINT}/country=${countryNameEncoded}/state=${stateNameEncoded}/cities`;
//                 const data = await fetchData(url);
//                 setCities(data);
//             };
//             getCities();
//         } else {
//             setCities([]);
//         }
//         setSelectedCity('');
//     }, [selectedState, selectedCountry, fetchData]);
//     const handleCountryChange = (event) => {
//         setSelectedCountry(event.target.value);
//     };

//     const handleStateChange = (event) => {
//         setSelectedState(event.target.value);
//     };

//     const handleCityChange = (event) => {
//         setSelectedCity(event.target.value);
//     };
//     const selectStyle = {
//         padding: '10px',
//         margin: '0 10px',
//         minWidth: '200px',
//         fontSize: '16px',
//         borderRadius: '4px',
//         border: '1px solid #ccc',
//     };
//     return (
//         <div style={{ padding: '40px', textAlign: 'center' }}>
//             <h1>Select Location</h1>
//             {error && <p style={{ color: 'red' }}> Error: {error}</p>}
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '30px 0' }}>
//                 <select
//                     style={selectStyle}
//                     value={selectedCountry}
//                     onChange={handleCountryChange}
//                     disabled={countries.length === 0}
//                 >
//                     <option value="" disabled>Select Country</option>
//                     {countries.map((country) => (
//                         <option
//                             key={country}
//                             value={country}
//                             country_name={country}
//                         >
//                             {country}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     style={selectStyle}
//                     value={selectedState}
//                     onChange={handleStateChange}
//                     disabled={!selectedCountry || states.length === 0 || loading}
//                 >
//                     <option value="" disabled>Select State</option>
//                     {states.map((state) => (
//                         <option
//                             key={state}
//                             value={state}
//                             state_name={state}
//                         >
//                             {state}
//                         </option>
//                     ))}
//                 </select>
//                 <select
//                     style={selectStyle}
//                     value={selectedCity}
//                     onChange={handleCityChange}
//                     disabled={!selectedState || cities.length === 0 || loading}
//                 >
//                     <option value="" disabled>Select City</option>
//                     {cities.map((city) => (
//                         <option
//                             key={city}
//                             value={city}
//                             city_name={city}
//                         >
//                             {city}
//                         </option>
//                     ))}
//                 </select>



//                 {/* <select style={selectStyle}>
//                     <option value="" disabled>Select Country</option>
//                     <option value="USA" country_name="USA">USA</option>
//                     <option value="Canada" country_name="Canada">Canada</option>
//                     <option value="India" country_name="India">India</option>
//                 </select>
//                 <select style={selectStyle}>
//                     <option value="" disabled>Select State</option>
//                     <option value="California" state_name="California">California</option>
//                     <option value="Texas" state_name="Texas">Texas</option>
//                 </select>
//                 <select style={selectStyle}>
//                     <option value="" disabled>Select City</option>
//                     <option value="Los Angeles" city_name="Los Angeles">Los Angeles</option>
//                     <option value="San Francisco" city_name="San Francisco">San Francisco</option>
//                 </select> */}
//             </div>
//             {selectedCountry && selectedState && selectedCity && (
//                 <p style={{ fontWeight: 'bold', fontSize: '20px', marginTop: '30px' }}>
//                     You selected {selectedCity}, <span style={{color:'gray'}}>{selectedState}, {selectedCountry}</span>
//                 </p>
//             )}
//         </div>
//     );
// }
// export default LocationSelection;

















