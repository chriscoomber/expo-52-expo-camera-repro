import { CameraView, CameraType, useCameraPermissions, type BarcodeScanningResult } from 'expo-camera';
import { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Navigation from './navigation';
import { DefaultTheme } from '@react-navigation/native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  const [screen, setScreen] = useState<'react-navigation' | 'ScanQRScreenWithoutReactNavigation' | 'menu'>('menu')


  if (screen === 'react-navigation') {
    return <Navigation theme={DefaultTheme}/>
  } else if (screen === 'ScanQRScreenWithoutReactNavigation') {
    return <ScanQRScreenWithoutReactNavigation goBack={() => setScreen('menu')}/>
  } else {
    return <View style={{flex: 1, backgroundColor: 'black'}}>
      {(!permission || !permission.granted) ? 
        <Button title='Request camera permissions' onPress={requestPermission}/> : 
        <Text>Camera permissions granted</Text>}
        <Button title='Go to react-navigation' onPress={() => setScreen('react-navigation')}/>
        <Button title='Go to scan qr without react navigation' onPress={() => setScreen('ScanQRScreenWithoutReactNavigation')}/>
    </View>
  }
}

function ScanQRScreenWithoutReactNavigation(props: {goBack: () => void}) {
    const [scanned, setScanned] = useState(false);
    const [camera, setCamera] = useState<CameraView | null>(null);
    const { height } = useWindowDimensions();
    const [barcodeContents, setBarcodeContents] = useState('');
  
    // Set QR bounds
    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);
    const [qrHeight, setQRHeight] = useState(0);
    const [qrWidth, setQRWidth] = useState(0);
  
    /** Callback for when a barcode is scanned. */
    const handleBarCodeScanned = useCallback(
      async (result: BarcodeScanningResult) => {
        const { data, bounds } = result;
        camera?.pausePreview();
        setScanned(true);
  
        if (bounds) {
          const origin = { y: Number(bounds.origin.y), x: Number(bounds.origin.x) };
          const size = {
            height: Number(bounds.size.height),
            width: Number(bounds.size.width)
          };
  
          const padding = 50;
          setTop(origin.y - padding / 2);
          setLeft(origin.x - padding / 2);
          setQRHeight(size.height + padding);
          setQRWidth(size.height + padding);
        }
  
        setBarcodeContents(data)
        
      },
      [camera]
    );
  
    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            top: top,
            left: left,
            height: qrHeight,
            width: qrWidth,
            zIndex: 2,
            pointerEvents: 'none'
          }}
        >
          <View style={{ width: qrWidth, height: qrHeight, borderWidth: 2, borderColor: 'red' }}/>
        </View>
        <View style={{ flex: 1 }}>
          <CameraView
            ref={ref => {
              setCamera(ref);
            }}
            style={[StyleSheet.absoluteFill, { height: height }]}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          />
          <View style={{height: 80}}/>
          <Button title='go back' onPress={props.goBack}/>
          {barcodeContents && <Text style={{backgroundColor: 'white'}}>Barcode read: "{barcodeContents}"{"\n"}Return to home and come back to this screen to un-freeze the preview.</Text>}
        </View>
      </View>
    );
}
