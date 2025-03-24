import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";

export default function Inicio() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo verde jamg.png")} // Ruta corregida
        style={styles.logo}
      />
      <Text style={styles.title}>¡Te damos la bienvenida!</Text>
      <Text style={styles.subtitle}>Inicia sesión o agenda tu cita fácilmente, sin necesidad de registro. ¡Tu momento de belleza está a un clic!</Text>
      <View style={styles.contenedorBotones}>
        <TouchableOpacity style={styles.botonIngresar}  onPress={() => router.push("/login")}>
          <Text style={styles.textoBoton}>Inicia sesión o registrate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/agendamiento")} style={styles.botonAgendar}>
          <Text style={styles.textoBotonAgendar}>Agenda tu cita</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Asegura que la imagen esté arriba
    alignItems: "center", // Centra todo horizontalmente
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 300, // Ajusta el tamaño de la imagen
    height: 300,
    resizeMode: "contain", // Evita distorsión
    marginTop: 50, // Espacio desde la parte superior
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: 'gray',
    marginTop: 20 // Separación entre la imagen y el texto
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: 'gray',
  },
  botonIngresar: {
    backgroundColor: "#94c87d",
    padding: 12,
  //   width: "80%", // Hace que los botones sean más anchos
  // alignItems: "center",
    borderRadius: 20
  },
  botonAgendar: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 20,
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
  textoBoton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  contenedorBotones: {
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center', // Centra los botones horizontalmente
    gap: 15, // Espaciado entre botones (si tu versión lo soporta)
    // marginTop: 20,
  }
});
