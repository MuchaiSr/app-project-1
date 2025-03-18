(() => {
    const locationButton = document.querySelector("button");
    const weatherSection = document.querySelector(".weather");

    function retrieveData() {
        const savedData = localStorage.getItem("weather");
        const arrayData = JSON.parse(savedData);
        arrayData.forEach((item) => {
            const paragraph = document.createElement("p");
            paragraph.textContent = item;
            weatherSection.appendChild(paragraph);
        });
    }
    retrieveData();
    
    weatherSection.addEventListener("click", (event) => {
        if (event.target === locationButton) {
            const input = document.querySelector("input");
            const inputValue = input.value.trim();

            const weatherApiKey = "c1d45315e62c578b08a4ab5cf29ee80c";
            const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${weatherApiKey}&units=metric`;

            async function fetchData() {
                if (!inputValue) alert ("Please enter a valid location.");
                try {
                    const rawWeatherData = await fetch(weatherApiUrl);
                    const objectData = await rawWeatherData.json();
                    console.log(objectData);

                    const weather = objectData.weather[0];
                    const weatherDescription = weather.description;
                    const weatherTemperature = objectData.main.temp;
                    const city = objectData.name;
                    const paragraphArray = [];
                    for (let i = 0; i < 3; i++) {
                        const paragraph = document.createElement("p");
                        weatherSection.appendChild(paragraph);
                        paragraphArray.push(paragraph);
                    }
                    paragraphArray[0].textContent = `city: ${city}`;
                    paragraphArray[1].textContent =`Description: ${weatherDescription}`;
                    paragraphArray[2].textContent = `Temperature: ${weatherTemperature}`;

                    function saveData() {
                        const rawData = paragraphArray.map((paragraph) => paragraph.textContent);
                        const stringData = JSON.stringify(rawData);
                        localStorage.setItem("weather", stringData);
                    }
                    saveData();
                } catch(error) {
                    alert("Something went wrong");
                }
            }
            fetchData();
        }
    });
})();;