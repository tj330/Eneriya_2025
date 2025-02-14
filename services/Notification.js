import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert('Must use a physical device for push notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permission not granted for notifications!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Expo Push Token:', token);
  
  return token;
}

export async function requestNotificationPermissions() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission for notifications not granted!');
    }
    
    return status
  }

export const showNotification = async ( title, body ) => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) return;
    await Notifications.scheduleNotificationAsync({
      content: {
        title, 
        body
      },
      trigger: {
        seconds: 1,
        channelId: 'Distress',
      }, 
    });
  };