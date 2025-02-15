import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MarkersContext } from '../context/MarkersContext';

const Weather = () => {
  const [weather, setWeather] = React.useState(null);
  const { location } = useContext(MarkersContext);

  useEffect(() => {
    const { lat, lon } = location;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5959878efacce36551495a8059ae2d77&units=metric`)
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
      });
  }, [location]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={s.container}>
        <View style={s.content}>
          {weather && (
            <>
              <Text style={s.title}>Weather Update 🌤</Text>
              <Text style={s.location}>📍 {weather.name}</Text>

              <Image
                style={s.icon}
                source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
              />

              <Text style={s.temp}>{weather.main.temp}°C</Text>
              <Text style={s.feelsLike}>Feels Like {weather.main.feels_like}°C</Text>

              <View style={s.weatherDetails}>
                <Text style={s.detailText}>🌫 Humidity: {weather.main.humidity}%</Text>
                <Text style={s.detailText}>🌀 Wind: {weather.wind.speed} m/s</Text>
                <Text style={s.detailText}>🔻 Pressure: {weather.main.pressure} hPa</Text>
                <Text style={s.detailText}>🌥 {weather.weather[0].description}</Text>
              </View>
            </>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Weather;

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    backgroundColor: 'rgba(215, 210, 210, 0.97)',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  location: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    marginBottom: 10,
  },
  icon: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#333',
  },
  feelsLike: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  weatherDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    width: '90%',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 3,
  },
});