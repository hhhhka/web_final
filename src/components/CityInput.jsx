import { useState, useRef } from "react";
import getLatLong from "../util/getLatLong.js";
import { FaMagnifyingGlass } from "react-icons/fa6";

function isError(obj) {
  return Object.prototype.toString.call(obj) === "[object Error]";
}

export default function CityInput({ addCity }) {
  const [error, setError] = useState(null);
  const inputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    let inputFieldData = fd.get("cityInput");

    if (inputFieldData.trim().length < 1) {
      return;
    }

    // remove all non letters or numbers
    inputFieldData = inputFieldData.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

    async function fetchLatLong(city) {
      const newCoords = await getLatLong(city);
      const checkForError = isError(newCoords);
      if (checkForError) {
        setError(newCoords);
        return;
      }

      const cityDataModified = {
        name: newCoords.display_name,
        lat: +newCoords.lat,
        lon: +newCoords.lon,
      };

      addCity(cityDataModified);
      setError(null);
    }

    fetchLatLong(inputFieldData);
    inputRef.current.value = "";
    inputRef.current.focus();
  }

  return (
    <div>
      <form onSubmit={submitHandler} style={{ display: 'flex', alignItems: 'center' }}>
        <label htmlFor="cityInput">
          <FaMagnifyingGlass />
        </label>
        <input
  id="cityInput"
  name="cityInput"
  placeholder="Enter a City"
  ref={inputRef}
  style={{
    backgroundColor: 'white',
    borderRadius: '10px', // Закругленные края
    padding: '8px', // Пространство внутри поля ввода
    marginLeft: '5px', // Добавим немного отступа от значка поиска
    flex: 1, // Растягиваем поле ввода на всю доступную ширину
    color: 'black', // Цвет текста в поле ввода
    border: 'none',
  }}
/>

<button
  style={{
    marginLeft: '8px', // Добавляем отступ слева
    fontSize: '12px', // Устанавливаем меньший размер шрифта
    /* Другие необходимые стили */
  }}
>
  Add City
</button>
      </form>
      {error ? <p>Error: {error.message} </p> : null}
    </div>
  );
}

