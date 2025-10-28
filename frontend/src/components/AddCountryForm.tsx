import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_COUNTRY } from '../graphql/mutation';
import { GET_COUNTRIES, GET_CONTINENTS } from '../graphql/queries';
import './AddCountryForm.css';

function AddCountryForm() {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [emoji, setEmoji] = useState('');
  const [continentId, setContinentId] = useState('');

  const { data: continentsData } = useQuery(GET_CONTINENTS);
  
  const [addCountry, { loading, error }] = useMutation(ADD_COUNTRY, {
    refetchQueries: [{ query: GET_COUNTRIES }],
    onCompleted: () => {
      setName('');
      setCode('');
      setEmoji('');
      setContinentId('');
      alert('Pays ajouté avec succès !');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const countryData: any = {
        name,
        code,
        emoji,
      };
      if (continentId) {
        countryData.continent = { id: continentId };
      }

      await addCountry({
        variables: {
          data: {
            name,
            code: code.toUpperCase(),
            emoji,
          },
        },
      });
    } catch (error) {
      alert("Une erreur est survenue lors de l'ajout du pays.");
    }
  }
    

  return (
    <div className="form-container">
    
      {error && (
        <div className="error-message">
          Erreur : {error.message}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="add-country-form">
        <div className="form-group">
          <label htmlFor="name">Nom du pays *</label>
          <input
            id="name"
            type="text"
            placeholder="Ex: Danemark"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="code">Code du pays (2 lettres) *</label>
          <input
            id="code"
            type="text"
            placeholder="Ex: DK"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={2}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="emoji">Emoji du drapeau *</label>
          <input
            id="emoji"
            type="text"
            placeholder="Ex: 🇩🇰"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="continent">Continent (optionnel)</label>
          <select
            id="continent"
            value={continentId}
            onChange={(e) => setContinentId(e.target.value)}
          >
            <option value="">-- Choisir un continent --</option>
            {continentsData?.continents.map((continent: any) => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Ajout en cours...' : 'Ajouter le pays'}
        </button>
      </form>
    </div>
  );
}

export default AddCountryForm;