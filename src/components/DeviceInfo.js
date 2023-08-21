import { format } from 'date-fns';
import * as Device from 'expo-device';
import NetInfo from '@react-native-community/netinfo';

export const getDeviceInfo = async () => {
  const deviceInfo ={
    modelName : Device.modelName,
    brand : Device.brand,
    designName : Device.designName,
    deviceName : Device.deviceName,
    // deviceType : Device.deviceType,
    deviceYearClass : Device.deviceYearClass,
    isDevice : Device.isDevice,
    manufacturer : Device.manufacturer,
    osBuildFingerprint : Device.osBuildFingerprint,
    osName : Device.osName,
    osVersion : Device.osVersion,
    // deviceId : Device.deviceId,
    productName : Device.productName,
    totalMemory : Device.totalMemory,
    deviceInfoAt: format(new Date(), "dd-MM-yyyy hh:mm:ss"),
  }
  return deviceInfo;
};

export const checkInternetConnectivity = async () => {
  const netInfoState = await NetInfo.fetch();
  return netInfoState.isConnected;
};