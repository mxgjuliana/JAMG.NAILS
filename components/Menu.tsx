
import React, { FunctionComponent } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import { ExternalPathString, RelativePathString, useRouter } from 'expo-router';

interface IMenuprops {
    ruta: RelativePathString | ExternalPathString
}

const Volver: FunctionComponent<IMenuprops> = ({ ruta }) => {
    const router = useRouter();
    return (
        <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => router.push(ruta)}>
                <MaterialIcons name="chevron-left" size={30} color="#333" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'flex-start',
        position: 'absolute'
    },

});

export default Volver;