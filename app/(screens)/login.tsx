
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ActivityIndicator,
    Image
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface IUsuario {
    Usuario: string,
    Contrasena: string
}

const MOCK_USER: IUsuario = {
    Usuario: 'julianamxg',
    Contrasena: '123456',
};

export default function Login() {
    const [datosUusario, setDatosUsuario] = useState<IUsuario>({ Usuario: '', Contrasena: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

      const router = useRouter();

    const handleLogin = async () => {
        setError('');
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (datosUusario.Usuario === MOCK_USER.Usuario && datosUusario.Contrasena === MOCK_USER.Contrasena) {
            alert('¡Bienvenido!');
        } else {
            setError('Credenciales incorrectas');
        }

        setIsLoading(false);
    };

    const manejarCambioDatosUsuario = (
        nombreCampo: keyof IUsuario,
        nuevoValor: IUsuario[keyof IUsuario]
    ) => {
        setDatosUsuario((valorActual) => ({ ...valorActual, [nombreCampo]: nuevoValor }));
    };

    return (
        // <LinearGradient
        //   colors={['#4158D0', '#C850C0', '#FFCC70']}
        //   style={styles.container}
        // >
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
        >
            <View style={styles.logoContainer}>
                <Image
                    source={require("../assets/images/logo_recortado_jamg.png")} // Ruta corregida
                    style={styles.logo}
                />
            </View>

            <View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <MaterialIcons name="person" size={24} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Usuario"
                        placeholderTextColor="#666"
                        value={datosUusario.Usuario}
                        onChangeText={(texto) => {
                            manejarCambioDatosUsuario('Usuario', texto);
                            setError('');
                        }}
                        keyboardType="default"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputWrapper}>
                    <MaterialIcons name="lock" size={24} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, { paddingRight: 50 }]}
                        placeholder="Contraseña"
                        placeholderTextColor="#666"
                        value={datosUusario.Contrasena}
                        onChangeText={(texto) => {
                            manejarCambioDatosUsuario('Contrasena', texto);
                            setError('');
                        }}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <MaterialIcons
                            name={showPassword ? 'visibility' : 'visibility-off'}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                    style={styles.forgotPassword}
                    onPress={() => alert('Funcionalidad en desarrollo')}
                >
                    <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                    )}
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>O continúa con</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity
                        style={[styles.socialButton, { backgroundColor: '#94c87d' }]}
                        onPress={() => alert('Funcionalidad en desarrollo')}
                    >
                        <FontAwesome5 name="google" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.socialButton, { backgroundColor: '#94c87d' }]}
                        onPress={() => alert('Funcionalidad en desarrollo')}
                    >
                        <FontAwesome5 name="facebook-f" size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.socialButton, { backgroundColor: '#94c87d' }]}
                        onPress={() => alert('Funcionalidad en desarrollo')}
                    >
                        <FontAwesome5 name="apple" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>¿No tienes una cuenta? </Text>
                    <TouchableOpacity onPress={() => alert('Funcionalidad en desarrollo')}>
                        <Text style={styles.signupLink}>Regístrate</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.signupContainer}>
                    <TouchableOpacity  onPress={() => router.push("/agendamiento")} style={styles.botonAgendar}>
                        <Text style={styles.textoBotonAgendar}>Agenda tu cita</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
        // </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        width: 300, // Ajusta el tamaño de la imagen
        height: 300,
        resizeMode: "contain", // Evita distorsión
        // marginTop: 30, // Espacio desde la parte superior
    },
    logoContainer: {
        alignItems: 'center',
        // marginBottom: 5,
    },
    welcomeText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
    },
    subText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    formContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 20,
        borderRadius: 20,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.3,
        // shadowRadius: 4.65,
        elevation: 8,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        color: '#333',
        fontSize: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
    },
    errorText: {
        color: '#ff3333',
        marginBottom: 10,
        textAlign: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#666',
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#94c87d',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    dividerText: {
        color: '#666',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 20,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        color: '#666',
        fontSize: 14,
    },
    signupLink: {
        color: '#94c87d',
        fontSize: 14,
        fontWeight: 'bold',
    },
    botonAgendar: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 20,
        marginTop: 10,
        //   width: "80%", // Hace que los botones sean más anchos
        // alignItems: "center",
        borderWidth: 1, // Define el grosor del borde
        borderColor: "#94c87d",
    },
    textoBotonAgendar: {
        color: "#94c87d",
        fontWeight: "bold",
        textAlign: "center"
    },
});