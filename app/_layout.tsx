import { MaterialCommunityIcons } from '@expo/vector-icons'
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono'
import { NotoSans_400Regular } from '@expo-google-fonts/noto-sans'
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavLightTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as Localization from 'expo-localization'
import { router, SplashScreen, Stack } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Platform, useColorScheme } from 'react-native'
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper'

import { Locales, Setting, StackHeader, Themes } from '@/lib'
import { setAuthHeaders } from '@/lib/api/auth-service'
import { fetchUserData } from '@/lib/api/user-service'
import User from '@/lib/models/user'
import rootStore from '@/lib/stores/root-store'
import Organisation from '@/lib/models/organisation'
import Property from '@/lib/models/property'
import Conversation from '@/lib/models/conversation'

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router'

// Ensure that reloading on `/modal` keeps a back button present.
export const unstable_settings = { initialRouteName: '(tabs)' }

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [errorData, setDataError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  interface UserDataConversation {
    id: string;
    property_id: string;
    user_id: string;
    label: string;
  }

  interface UserDataProperty {
    id: string;
    name: string;
    description: string;
    organisation_id: string;
    user_id: string;
    conversations: [UserDataConversation];
  }

  interface UserData {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    organisation: {
      id: string;
      name: string;
    }
    properties: [UserDataProperty];
  }

  const loadUserData = async () => {
    try {
        rootStore.setLoading(true);
        setLoading(true);
        await setAuthHeaders();
        const userData: UserData = await fetchUserData();
        const user = new User(userData.id, userData.first_name, userData.last_name, userData.email);
        const organisation = new Organisation(
          userData.organisation.id,
          userData.organisation.name,
        );
        userData.properties?.forEach((property: UserDataProperty) => {
          const propertyModel = new Property(
            property.id,
            property.name,
            property.description,
            property.organisation_id,
            property.user_id,
          );
          property.conversations?.forEach((conversation: UserDataConversation) => {
            propertyModel.addConversation(new Conversation(
              conversation.id,
              conversation.property_id,
              conversation.user_id,
              conversation.label,
            ))
          })
          organisation.addProperty(propertyModel);
        });
        rootStore.setUser(user);
        rootStore.setOrganisation(organisation);
    } catch (err) {
        router.push('/(auth)/login');
        setDataError('Failed to load user data');
        console.log(err)
    } finally {
        rootStore.setLoading(false);
        setLoading(false);
    }
  };

  useEffect(() => {
    if (!rootStore.user) {
      loadUserData();
    }
  }, []);

  const [loaded, error] = useFonts({
    NotoSans_400Regular,
    JetBrainsMono_400Regular,
    ...MaterialCommunityIcons.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  React.useEffect(() => {
    if (error) throw error
  }, [error])

  React.useEffect(() => {
    if (loaded && !loading) {
      SplashScreen.hideAsync()
    }
  }, [loaded, loading])

  if (!loaded) {
    return null
  }

  return <RootLayoutNav />
}

const RootLayoutNav = () => {
  const colorScheme = useColorScheme()
  const [settings, setSettings] = React.useState<Setting>({
    theme: 'auto',
    color: 'default',
    language: 'auto',
  })

  // Load settings from the device
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      SecureStore.getItemAsync('settings').then((result) => {
        if (result === null) {
          SecureStore.setItemAsync('settings', JSON.stringify(settings)).then(
            (res) => console.log(res),
          )
        }

        setSettings(JSON.parse(result ?? JSON.stringify(settings)))
      })
    } else {
      setSettings({ ...settings, theme: colorScheme ?? 'light' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    if (settings.language === 'auto') {
      Locales.locale = Localization.getLocales()[0].languageCode ?? 'en'
    } else {
      Locales.locale = settings.language
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const theme =
    Themes[
      settings.theme === 'auto' ? (colorScheme ?? 'dark') : settings.theme
    ][settings.color]

  const { DarkTheme, LightTheme } = adaptNavigationTheme({
    reactNavigationDark: NavDarkTheme,
    reactNavigationLight: NavLightTheme,
    materialDark: Themes.dark[settings.color],
    materialLight: Themes.light[settings.color],
  })

  return (
    <ThemeProvider
      value={
        colorScheme === 'light'
          ? { ...LightTheme, fonts: NavLightTheme.fonts }
          : { ...DarkTheme, fonts: NavDarkTheme.fonts }
      }
    >
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            animation: 'fade',
            header: (props) => (
              <StackHeader navProps={props} children={undefined} />
            ),
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="drawer" options={{ headerShown: false }} />
          <Stack.Screen
            name="property/[propertyId]"
            options={{ title: Locales.t('property') }}
          />
          <Stack.Screen
            name="chat/[chatId]"
            options={{ title: Locales.t('chat') }}
          />
          {/* <Stack.Screen
            name="modal"
            options={{ title: "mymodal", presentation: 'modal' }}
          /> */}
        </Stack>
      </PaperProvider>

      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

export default RootLayout
