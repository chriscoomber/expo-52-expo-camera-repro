import { NavigationContainer, Theme, useNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import ScanQRScreen from '../screens/ScanQRScreen';
import HomeScreen from '../screens/HomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({ theme }: { theme: Theme }) {
  
  return (
    <NavigationContainer theme={theme} >
      
        <RootStack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            gestureEnabled: false,
          }}
        >
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
          />

          <RootStack.Screen
            name="ScanQR"
            component={ScanQRScreen}
          />
        </RootStack.Navigator>

    </NavigationContainer>
  );
}

