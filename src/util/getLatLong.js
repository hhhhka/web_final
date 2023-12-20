export default async function getLatLong(cityName) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${cityName}`
    );
    console.log(response);
    const data = await response.json();
    console.log("inside getLatLong, got data");
    console.log(data);
    //console.log(data.length);

    if (!response.ok) {
      throw new Error("Failed to load data");
    }

    if (data.length < 1) {
      throw new Error("Invalid city");
    }

    // filters out results to top result (most likely what the user was after if vague input was given)
    const reducedData = data.reduce(function (prev, current) {
      return prev && prev.importance > current.importance ? prev : current;
    });

    console.log('reduced data: ',reducedData);

    return reducedData;
  } catch (error) {
    return error; //should i return error object or just the message from the object?
  }
}
