const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  searchForecast(search.value);
});

const searchForecast = address => {
  messageOne.textContent = "Loading weather forecast...";
  messageTwo.textContent = "";

  fetch(`/weather?address=${address}`).then(response =>
    response.json().then(({ error, forecast, location }) => {
      if (error) {
        return (messageOne.textContent = error);
      }
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
    })
  );
};
