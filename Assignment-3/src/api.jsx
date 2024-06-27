import axios from 'axios';


export async function getCity(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a916fc82468e0a73a6c45f67ae117c0c`);
        const hm = response.data;


        return hm;
    } catch (error) {
        console.error("Error occurred:", error);
        return "Error";
    }
}
