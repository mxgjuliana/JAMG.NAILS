// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

import { Drawer } from 'expo-router/drawer';
import { AppProvider } from './context/AppContext';
import CustomDrawer from './components/drawer/CustomDrawer';
import { usePathname } from 'expo-router';

export default function RootLayout() {
  const pathname = usePathname();
  const hideDrawer = pathname === '/(screens)/inicio' || pathname === '/(screens)/login';

  return (
    <AppProvider>
      <Drawer
        screenOptions={{
          headerShown: !hideDrawer,
          headerStyle: {
            backgroundColor: '#94c87d', // Color verde del proyecto
          },
          headerTintColor: '#fff', // Color del texto del header
          drawerStyle: {
            width: '80%',
          },
          swipeEnabled: !hideDrawer,
          swipeEdgeWidth: 50,
        }}
        drawerContent={hideDrawer ? () => null : () => (
          <CustomDrawer
            isLoggedIn={true} // Reemplazar con tu lógica de autenticación
            userName="Juan Pérez" // Reemplazar con el nombre del usuario logueado
            onLogout={() => {
              // Implementar lógica de cierre de sesión
              console.log('Cerrar sesión');
            }}
          />
        )}
      >
        <Drawer.Screen
          name="(screens)/inicio"
          options={{
            headerShown: false,
            swipeEnabled: false,
            drawerLabel: () => null,
            drawerIcon: () => null,
          }}
        />
        <Drawer.Screen
          name="(screens)/login"
          options={{
            headerShown: false,
            swipeEnabled: false,
            drawerLabel: () => null,
            drawerIcon: () => null,
          }}
        />
        <Drawer.Screen
          name="(screens)/agendamiento"
          options={{
            title: 'Agendar Cita',
          }}
        />
        <Drawer.Screen
          name="(screens)/misCitas"
          options={{
            title: 'Mis Citas',
          }}
        />
        <Drawer.Screen
          name="(screens)/cupones"
          options={{
            title: 'Cupones',
          }}
        />
      </Drawer>
    </AppProvider>
  );
}
