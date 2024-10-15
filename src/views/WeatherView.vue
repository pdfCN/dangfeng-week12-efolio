<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity" class="search-button">Search</button>
      </div>
    </div>
    <main>
      <div v-if="weatherData">
        <h2>
          {{ weatherData.name }}, {{ weatherData.sys.country }}
        </h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

const apikey = "cf7e8b7847714a3638daec894910521c";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      errorMessage: null, // 新增，用于存储错误信息
    };
  },
  computed: {
    temperature() {
      return this.weatherData
        ? Math.floor(this.weatherData.main.temp - 273.15)
        : null;
    },
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
  methods: {
    async searchByCity() {
      if (this.city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
        await this.fetchWeatherData(url);
      } else {
        this.errorMessage = "Please enter a city name."; // 提示用户输入城市名称
        console.error(this.errorMessage);
      }
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
        this.errorMessage = null; // 清除错误信息
      } catch (error) {
        this.weatherData = null;
        this.errorMessage = "Error fetching weather data. Please try again.";
        console.error("Error fetching weather data:", error);
      }
    },
  },
};
</script>
<style>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.header h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}


.search-input {
  padding: 10px;
  width: 70%;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
}

.search-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-button:hover {
  background-color: #0056b3;
}

main {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
}

main h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

main p {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
  margin: 10px 0;
}

main span {
  font-size: 1.2rem;
  color: #555;
  display: block;
  margin-top: 10px;
}

main img {
  width: 100px;
  height: 100px;
  margin: 10px 0;
}
</style>