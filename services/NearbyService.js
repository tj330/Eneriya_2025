// src/services/NearbyService.js
import { nearby } from '@awesome-react-native-nearby/nearby';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';

const BACKGROUND_TASK_NAME = 'NEARBY_BACKGROUND_TASK';
const SERVICE_ID = 'com.distressbeacon';

class NearbyService {
  static instance = null;
  listeners = new Set();
  isInitialized = false;

  static getInstance() {
    if (!NearbyService.instance) {
      NearbyService.instance = new NearbyService();
    }
    return NearbyService.instance;
  }

  async initialize() {
    if (this.isInitialized) return;

    try {
      await nearby.connect();
      await this.setupNotifications();
      await this.registerBackgroundTask();
      this.isInitialized = true;
      
      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to initialize NearbyService:', error);
      throw error;
    }
  }

  setupEventListeners() {
    nearby.onReceiveMessage(this.handleMessage);
    nearby.onEndpointFound(this.handleEndpointFound);
    nearby.onEndpointLost(this.handleEndpointLost);
    nearby.onConnectionInitiated((endpointId, info) => {
      nearby.acceptConnection(endpointId);
    });
  }

  async setupNotifications() {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async registerBackgroundTask() {
    TaskManager.defineTask(BACKGROUND_TASK_NAME, async ({ data, error }) => {
      if (error) {
        console.error('Background task error:', error);
        return;
      }

      const { type, message } = data;
      if (type === 'DISTRESS') {
        await this.handleDistressSignal(message);
      }
    });

    await Location.startLocationUpdatesAsync(BACKGROUND_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
      foregroundService: {
        notificationTitle: "Emergency Beacon Active",
        notificationBody: "Monitoring for distress signals",
      },
    });
  }

  handleMessage = async (endpointId, messageString) => {
    try {
      const message = JSON.parse(messageString);
      if (message.type === 'DISTRESS') {
        await this.handleDistressSignal(message);
      }
      this.notifyListeners('message', { endpointId, message });
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };

  handleEndpointFound = (endpointId, info) => {
    this.notifyListeners('endpointFound', { endpointId, info });
  };

  handleEndpointLost = (endpointId) => {
    this.notifyListeners('endpointLost', { endpointId });
  };

  async handleDistressSignal(message) {
    // Show notification even when app is in background
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚨 EMERGENCY DISTRESS SIGNAL',
        body: `Location: ${this.formatLocation(message.location)}\nTime: ${new Date(message.timestamp).toLocaleString()}`,
        data: message,
        priority: 'high',
      },
      trigger: null,
    });

    this.notifyListeners('distressSignal', message);
  }

  formatLocation(location) {
    if (!location?.coords) return 'Unknown';
    return `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`;
  }

  async startAdvertising() {
    try {
      await nearby.startAdvertising({
        serviceId: SERVICE_ID,
        strategy: 'P2P_CLUSTER',
      });
    } catch (error) {
      console.error('Failed to start advertising:', error);
      throw error;
    }
  }

  async startDiscovery() {
    try {
      await nearby.startDiscovery({
        serviceId: SERVICE_ID,
        strategy: 'P2P_CLUSTER',
      });
    } catch (error) {
      console.error('Failed to start discovery:', error);
      throw error;
    }
  }

  async sendDistressSignal(location) {
    const message = {
      type: 'DISTRESS',
      timestamp: new Date().toISOString(),
      location,
      deviceId: await this.getDeviceId(),
    };

    // Broadcast to all connected endpoints
    const endpoints = await nearby.getConnectedEndpoints();
    await Promise.all(
      endpoints.map(endpointId =>
        nearby.sendMessage(endpointId, JSON.stringify(message))
      )
    );
  }

  async getDeviceId() {
    // Implement device-specific ID generation
    return 'device-' + Math.random().toString(36).substring(7);
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  notifyListeners(event, data) {
    this.listeners.forEach(listener => listener(event, data));
  }

  async cleanup() {
    try {
      await nearby.stopAdvertising();
      await nearby.stopDiscovery();
      await Location.stopLocationUpdatesAsync(BACKGROUND_TASK_NAME);
      this.listeners.clear();
      this.isInitialized = false;
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

export default NearbyService;
