import React from 'react';
const API_KEY = import.meta.env.VITE_APP_API_KEY;
import { Link } from "react-router-dom";

const CoinInfo = ({name, brewery_type}) => {
  /*useEffect(() => {
    getCoinPrice();
    getCoinPrice().catch(console.error);
  }, [symbol]);

  const getCoinPrice = async () => {
    const response = await fetch(
      `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=` +
      API_KEY
    );
    const json = await response.json();
    setPrice(json);
  }

  const [price, setPrice] = useState(null);*/
  
  return (
    
    <div>
          <Link
      to={`/brewDetails/${name}`}
      key={name}
    >
        <li className="main-list">
          {name}, a {brewery_type} brewery
        </li>
        </Link>
    </div>
  
  );
};

export default CoinInfo;