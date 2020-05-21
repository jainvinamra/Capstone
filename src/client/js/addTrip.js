// a function that takes a city and country as well as departure date as its
// inputs, and sends a post request to the server with these data points

// post-route variable
// const url = 'http://localhost:8000/add';

const addTrip = async () => {
  let addData = {
    city: document.getElementById('locationInput').value,
    date: document.getElementById('departureInput').value
  };
  const res = await fetch('http://localhost:8082/add', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(addData),
  });
  try {
    const newData = await res.text();
    return newData; // this will be changed to feed into the code to update the html
  }
  catch(error) {
    console.log('error', error);
  };
};

export { addTrip };
