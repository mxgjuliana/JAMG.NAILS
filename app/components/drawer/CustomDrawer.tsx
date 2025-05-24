import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface CustomDrawerProps {
    isLoggedIn: boolean;
    userName?: string;
    onLogout?: () => void;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ isLoggedIn, userName, onLogout }) => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/logo_recortado_jamg.png')}
                    style={styles.logo}
                />
                {isLoggedIn && userName && (
                    <Text style={styles.userName}>Hola, {userName}</Text>
                )}
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/(screens)/agendamiento')}
                >
                    <MaterialIcons name="event" size={24} color="#94c87d" />
                    <Text style={styles.menuText}>Agendar Cita</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => router.push('/(screens)/misCitas')}
                >
                    <MaterialIcons name="calendar-today" size={24} color="#94c87d" />
                    <Text style={styles.menuText}>Mis Citas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.menuItem}
                    // onPress={() => router.push('/(screens)/cupones')}
                >
                    <MaterialIcons name="card-giftcard" size={24} color="#94c87d" />
                    <Text style={styles.menuText}>Cupones</Text>
                </TouchableOpacity>

                {isLoggedIn && (
                    <TouchableOpacity
                        style={[styles.menuItem, styles.logoutButton]}
                        onPress={onLogout}
                    >
                        <MaterialIcons name="logout" size={24} color="#ff6b6b" />
                        <Text style={[styles.menuText, styles.logoutText]}>Cerrar Sesión</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginTop: 10,
    },
    menuContainer: {
        padding: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    logoutButton: {
        marginTop: 20,
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#ff6b6b',
    },
});

export default CustomDrawer; 