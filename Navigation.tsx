import { createStaticNavigation,  StaticParamList, StaticScreenProps } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanQRScreen from './screens/ScanQRScreen';
import HomeScreen from './screens/HomeScreen';

export type RootStackProps = StaticScreenProps<{
  Home: undefined;
  ScanQR: undefined
}>;

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Home',
  screens: {
    Home: HomeScreen,
    ScanQR: ScanQRScreen  
  }
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Navigation = createStaticNavigation(RootStack);
export default Navigation