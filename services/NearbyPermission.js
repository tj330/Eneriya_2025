import {
    PERMISSIONS,
    RESULTS,
    checkMultiple,
    requestMultiple,
  } from "react-native-permissions";
  
export async function checkAndRequestPermission() {
    const permissions =
      Platform.OS === "ios"
        ? [PERMISSIONS.IOS.BLUETOOTH]
        : [
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            PERMISSIONS.ANDROID.BLUETOOTH_ADVERTISE,
            PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
            PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
            PERMISSIONS.ANDROID.NEARBY_WIFI_DEVICES,
          ];
  
    const checkPermissionStatus = await checkMultiple(permissions);
  
    const isAllGranted = Object.values(checkPermissionStatus).every((value) => {
      return (
        value === RESULTS.GRANTED ||
        value === RESULTS.UNAVAILABLE ||
        value === RESULTS.LIMITED
      );
    });
  
    if (isAllGranted) {
      return true;
    }
  
    // Request permission
    const result = await requestMultiple(permissions);
  
    const requestIsGranted = Object.values(result).every((value) => {
      return (
        value === RESULTS.GRANTED ||
        value === RESULTS.UNAVAILABLE ||
        value === RESULTS.LIMITED
      );
    });
  
    return requestIsGranted;
  }