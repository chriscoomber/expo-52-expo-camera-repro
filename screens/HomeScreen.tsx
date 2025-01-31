import { Button, Text, View } from "react-native";
import { RootStackProps } from "../navigation/types";

export default function HomeScreen({ navigation }: RootStackProps<'Home'>) {
    return <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Button title="Go to ScanQRScreen" onPress={() => navigation.push('ScanQR')}/>
    </View>
}