/* eslint-disable react/prop-types */
import { Card, CardContent, Typography } from '@mui/material';

const WeatherCard = ({ weather }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{weather.name}</Typography>
                <Typography variant="body2">{weather.weather[0].description}</Typography>
                <Typography variant="h6">{weather.main.temp}°K</Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
