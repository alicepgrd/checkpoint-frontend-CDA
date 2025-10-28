import CountryList from '../components/CountryList';
import AddCountryForm from '../components/AddCountryForm';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-page">
      <AddCountryForm />
      <CountryList />
    </div>
  );
}

export default HomePage;
