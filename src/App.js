import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [countries,setCountries]=useState([]);
  const [cstates,setStates]= useState([]);
  const [city ,setCity]= useState([]);

  const [selectcountry,setSelectCountry]= useState("");
  const [selectstates,setSelectStates]= useState("");
  const [selectcity,setSelectCity]= useState("");

  useEffect(()=>{ 
   fetch("https://crio-location-selector.onrender.com/countries")
   .then((response)=>response.json())
   .then((data)=>setCountries(data))
  },[])

  useEffect(() => {
    if (selectcountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectcountry}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data));
    }
  }, [selectcountry]);

  useEffect(() => {
    if (selectcountry && selectstates) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectcountry}/state=${selectstates}/cities`)
        .then((response) => response.json())
        .then((data) => setCity(data));
    }
  }, [selectstates, selectcountry]);
   console.log(countries)

   const handlecountry=(e)=>{
    setSelectCountry(e.target.value)
    setSelectStates("")
    setSelectCity("")
   }
   const handlestate=(e)=>{
    setSelectStates(e.target.value)
    setSelectCity("")
   }
   const handlecity=(e)=>{
    setSelectCity(e.target.value)
   }
   
  return (
    <div className="App">
      <h1>Select Location</h1>
    <div style={{display:"flex" ,justifyContent:"space-between" ,width:"90%",height:"90%" ,color:"black" }}>
      <select value={selectcountry} onChange={handlecountry} >
      <option value="" disabled>Select Country</option>
        {countries.map((country)=><option>{country}</option>)}
      </select> 

      <select value={selectstates}  onChange={handlestate} disabled={!selectcountry}>
      <option value="" disabled>Select state</option>
      {cstates.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
      </select> 

      <select value={selectcity}  onChange={handlecity}  disabled={!selectcountry || !selectstates}>
        <option value="" disabled>Select City</option>
        {city.map((cit)=> (<option key={cit} value={cit}>{cit}</option>))}
      </select>
    </div>
    {selectcity && (
        <h2>You Selected {selectcity}, {selectstates}, {selectcountry}</h2>
      )}
     
    </div>
  );
}

export default App;
