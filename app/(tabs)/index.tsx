import React from 'react'
import { Searchbar, Surface } from 'react-native-paper'

import { Locales, ScreenInfo, styles } from '@/lib'
import { NativeSyntheticEvent, TextInputFocusEventData, View } from 'react-native'
import { router } from 'expo-router'

const TabsHome = () => {
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onSearchBarFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    console.log('onSearchBarFocus');
    e.preventDefault();
    e.stopPropagation();
    // router.push('/(auth)/login');
  };

  return (
    <Surface style={styles.screen}>
      <View style={{
        flex: 2,
        width: '100%',
        // borderColor: 'blue',
        // borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ScreenInfo
          title={Locales.t('titleHome')}
          path="app/(tabs)/index.tsx"
        />
      </View>
      <View style={{
        flex: 1,
        width: '100%',
        // borderColor: 'blue',
        // borderWidth: 2,
        justifyContent: 'flex-end',
      }}>
        <Searchbar
          value={query}
          loading={loading}
          onChangeText={(v) => setQuery(v)}
          onFocus={(e) => onSearchBarFocus(e)}
          placeholder="Type here to search..."
          style={{ marginTop: 16, marginHorizontal: 16 }}
          pointerEvents="none"
        />
      </View>
    </Surface>
  );
}

export default TabsHome
