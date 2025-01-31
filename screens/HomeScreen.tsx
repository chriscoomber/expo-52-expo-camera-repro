import { useNavigation } from "@react-navigation/native";
import { Button, View } from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation();

    return <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Button title="Go to ScanQRScreen" onPress={() => navigation.navigate('ScanQR')}/>
    </View>
}