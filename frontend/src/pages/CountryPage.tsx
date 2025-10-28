import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_COUNTRY } from '../graphql/queries';
import './CountryPage.css';

function CountryPage() {

  const { code } = useParams<{ code: string }>();
  
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { code },
  });
  if (loading) {
    return <p className="loading">Chargement...</p>;
  }
  if (error) {
    return <p className="error">Erreur : {error.message}</p>;
  }

  const country = data.country;

  return (
    <div className="country-page">
      <Link to="/" className="back-button">
        Retour à la liste
      </Link>
      
      <div className="country-details-card">
        <span className="country-emoji-large">{country.emoji}</span>
        
        <h1 className="country-title">{country.name}</h1>
        
        <div className="country-info">
          <div className="info-item">
            <span className="info-label">Code :</span>
            <span className="info-value">{country.code}</span>
          </div>
          
          {country.continent && (
            <div className="info-item">
              <span className="info-label">Continent :</span>
              <span className="info-value">{country.continent.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;