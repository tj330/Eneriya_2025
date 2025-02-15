import BLEPeripheral from 'react-native-ble-peripheral';
import { BleManager } from 'react-native-ble-plx';

const SERVICE_UUID = '00001802-0000-1000-8000-00805f9b34fb'; // Random service UUID
const CHARACTERISTIC_UUID = '00002A06-0000-1000-8000-00805f9b34fb'; // Distress characteristic


// const bleManager = new BleManager();

export const startBroadcasting = async () => {
  try {
    await BLEPeripheral.addService(SERVICE_UUID, true);
    await BLEPeripheral.addCharacteristicToService(
      SERVICE_UUID,
      CHARACTERISTIC_UUID,
      16 | 1, // Read and Write permissions
      16 // Notify property
    );
    
    BLEPeripheral.setName('Distress_Signal');
    await BLEPeripheral.start();
    console.log('Distress signal broadcasting...');
  } catch (error) {
    console.error('Error broadcasting distress signal:', error);
  }
};

export const stopBroadcasting = () => {
  BLEPeripheral.stop();
  console.log('Stopped broadcasting distress signal');
};

export const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        return;
      }
  
      if (device.name === 'Distress_Signal') {
        console.log('Distress signal detected:', device.id);
        bleManager.stopDeviceScan();
        
        // Connect to device
        bleManager.connectToDevice(device.id).then(() => {
          console.log('Connected to distress signal sender');
        }).catch(err => console.error('Connection error:', err));
      }
    });
  
    console.log('Scanning for distress signals...');
  };
  