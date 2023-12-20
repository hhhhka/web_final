export default function Header({ listOfLocations }) {
  
  const hasLocations = listOfLocations.length > 0;  

  return (
    <header>
      <h2>My Weather App</h2>
      {!hasLocations && <p>Enter a location to get started</p>}
    </header>
  );
}
