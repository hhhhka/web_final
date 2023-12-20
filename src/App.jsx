import { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import CityInput from "./components/CityInput.jsx";
import LocationList from "./components/LocationList.jsx";
import UnitToggle from "./components/UnitToggle.jsx";

function App() {
  const [listOfLocations, setListOfLocations] = useState([
    { name: "Almaty", lat: 45.4112, lon: -75.6981 },
  ]);
  const [temperatureUnit, setTemperatureUnit] = useState("fahrenheit");

  function updateCities(inputFieldData) {
    //why does this function update in profiler and rerender cityinput component?

    let dupeCheck = listOfLocations.findIndex(
      ({ name }) => name === inputFieldData.name
    );

    if (inputFieldData.name && dupeCheck < 0) {
      setListOfLocations([
        {
          name: inputFieldData.name,
          lat: inputFieldData.lat,
          lon: inputFieldData.lon,
        },
        ...listOfLocations,
      ]);
    }
  }

  function updateUnit(checkboxValue) {
    checkboxValue
      ? setTemperatureUnit("fahrenheit")
      : setTemperatureUnit("celsius");
  }

  function removeLocation(location) {
    let findExisting = listOfLocations.findIndex(
      (city) => location.lat === city.lat
    );
    //console.log(findExisting);

    let newArray = [...listOfLocations];
    newArray.splice(findExisting, 1);
    //console.log(newArray);
    setListOfLocations(newArray);
  }

  return (
    <>
      {/* {import.meta.env.VITE_SECRET_KEY}
      {import.meta.env.MY_KEY} */}

      <UnitToggle updateUnit={updateUnit} />
      <Header listOfLocations={listOfLocations} />
      <CityInput addCity={updateCities} />
      <LocationList
        listOfLocations={listOfLocations}
        removeLocation={removeLocation}
        unit={temperatureUnit}
      />
    </>
  );
}

export default App;
