import React from 'react'
import { Searchbar, Surface } from 'react-native-paper'

import { Locales, PropertyInfo, styles } from '@/lib'
import { NativeSyntheticEvent, TextInputFocusEventData, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import rootStore from '@/lib/stores/root-store'
import { observer } from 'mobx-react-lite'
import Chatbox from '@/lib/ui/components/Chatbox'

const TabsChat = observer(() => {
  const { chatId, propertyId }: { chatId: string, propertyId: string } = useLocalSearchParams();
  // const [query, setQuery] = React.useState('')
  // const [loading, setLoading] = React.useState(false)

  // const onSearchBarFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
  //   console.log('onSearchBarFocus');
  //   // e.preventDefault();
  //   // e.stopPropagation();
  //   // router.push('/(auth)/login');
  // };

  return (
    <Chatbox chatId={chatId} propertyId={propertyId}  />
  );

  // return (
  //   <Surface style={styles.screen}>
  //     <View style={{
  //       flex: 2,
  //       width: '100%',
  //       // borderColor: 'blue',
  //       // borderWidth: 2,
  //       alignItems: 'center',
  //       justifyContent: 'center',
  //     }}>
  //       { rootStore.user &&
  //         <PropertyInfo
  //           id={'1'}
  //         />
  //       }
  //     </View>
  //     <View style={{
  //       flex: 1,
  //       width: '100%',
  //       // borderColor: 'blue',
  //       // borderWidth: 2,
  //       justifyContent: 'flex-end',
  //     }}>
  //       <Searchbar
  //         value={query}
  //         loading={loading}
  //         onChangeText={(v) => setQuery(v)}
  //         onFocus={(e) => onSearchBarFocus(e)}
  //         placeholder="Type here to search..."
  //         style={{ marginTop: 16, marginHorizontal: 16 }}
  //       />
  //     </View>
  //   </Surface>
  // );
});

export default TabsChat
