import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from './Components/coinInfo';
import SideNav from './Components/sideNav';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [list, setList] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [breweryTypes, setBreweryTypes] = useState({});

  //api call
  useEffect(() => {
    fetchAllBreweryData();
    fetchAllBreweryData().catch(console.error);
  }, []);

  //additional functions
  const fetchAllBreweryData = async () => {
    const response = await fetch(
      "https://api.openbrewerydb.org/v1/breweries?by_state=new_jersey&per_page=200" 
    );
    const json = await response.json();
    setList(json);
    updateBreweryTypes(json);
  };

  const updateBreweryTypes = (breweryData) => {
    const types = {};
    for (const brewery of breweryData) {
      const type = brewery.brewery_type;
      if (types[type]) {
        types[type] += 1;
      } else {
        types[type] = 1;
      }
    }
    setBreweryTypes(types);
  };

  const searchItems = (searchValue, breweryType) => {
    setSearchInput(searchValue);
    if (searchValue !== "" || breweryType !== "") {
      const filteredData = list.filter((brewery) => {
        const nameMatch = Object.values(brewery)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        const typeMatch = breweryType === "" || brewery.brewery_type === breweryType;
        return nameMatch && typeMatch;
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list);
    }
  };

  return (
    <div className="whole-page">

      <h1>My Brewery List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          onChange={(inputString) => searchItems(inputString.target.value, "")}
        />
        <select
          onChange={(event) => searchItems("", event.target.value)}
        >
          <option value="">All Types</option>
          {Object.keys(breweryTypes).map((type) => (
            <option value={type}>{type} ({breweryTypes[type]})</option>
          ))}
        </select>
      </div>

      <ul className='listContainer'>
        {filteredResults.map((brewery) => (
          <CoinInfo
            name={brewery.name}
            brewery_type={brewery.brewery_type}
          />
        ))}
      </ul>

    </div>
  )
}

export default App