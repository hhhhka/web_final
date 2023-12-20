import Location from "./Location.jsx";

export default function LocationList({
  listOfLocations,
  removeLocation,
  unit,
}) {
  const allLocations = listOfLocations.map((city, index) => (
    <Location
      key={index}
      myKey={index}
      city={city.name}
      lat={city.lat}
      lon={city.lon}
      unit={unit}
      removeLocation={removeLocation}
    />
  ));

  return <section>{allLocations}</section>;
}
