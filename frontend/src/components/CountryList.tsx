import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_COUNTRIES } from '../graphql/queries';
import './CountryList.css';

function CountryList() {

  const { data } = useQuery(GET_COUNTRIES);

  if (!data) {
    return <p>Chargement...</p>;
  }
  return (
    <div className="countries-container">
      
      <div className="countries-grid">
        {data.countries.map((country: any) => (
          <Link 
            key={country.code} 
            to={`/country/${country.code}`}
            className="country-card"
          >
            <span className="country-emoji">{country.emoji}</span>
            <h3 className="country-name">{country.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountryList;