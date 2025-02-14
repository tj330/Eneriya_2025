
import { useState, useEffect } from 'react';
import NearbyService from '../services/NearbyService';

export const useNearbyService = () => {
  const [devices, setDevices] = useState(new Map());
  const [isAdvertising, setIsAdvertising] = useState(false);
  const [isDiscovering, setIsDiscovering] = useState(false);

  useEffect(() => {
    const service = NearbyService.getInstance();
    
    const handleEvent = (event, data) => {
      switch (event) {
        case 'endpointFound':
          setDevices(prev => new Map(prev).set(data.endpointId, data.info));
          break;
        case 'endpointLost':
          setDevices(prev => {
            const newDevices = new Map(prev);
            newDevices.delete(data.endpointId);
            return newDevices;
          });
          break;
      }
    };

    service.initialize().then(() => {
      const cleanup = service.addListener(handleEvent);
      return () => {
        cleanup();
        service.cleanup();
      };
    });
  }, []);

  const startAdvertising = async () => {
    try {
      await NearbyService.getInstance().startAdvertising();
      setIsAdvertising(true);
    } catch (error) {
      setIsAdvertising(false);
      throw error;
    }
  };

  const startDiscovery = async () => {
    try {
      await NearbyService.getInstance().startDiscovery();
      setIsDiscovering(true);
    } catch (error) {
      setIsDiscovering(false);
      throw error;
    }
  };

  const sendDistressSignal = async (location) => {
    await NearbyService.getInstance().sendDistressSignal(location);
  };

  return {
    devices: Array.from(devices.entries()),
    isAdvertising,
    isDiscovering,
    startAdvertising,
    startDiscovery,
    sendDistressSignal,
  };
};