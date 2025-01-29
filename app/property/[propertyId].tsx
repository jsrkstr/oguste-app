import React, { useState } from 'react'
import { FAB, List, Searchbar, Surface, Text } from 'react-native-paper'

import { Locales, PropertyInfo, styles } from '@/lib'
import { NativeSyntheticEvent, TextInputFocusEventData, View } from 'react-native'
import { router, useLocalSearchParams, useRouter } from 'expo-router'
import rootStore from '@/lib/stores/root-store'
import { observer } from 'mobx-react-lite'
import Property from '@/lib/models/property'
import PropertyDocuments from '@/lib/ui/components/PropertyDocuments'
import PropertyConversations from '@/lib/ui/components/PropertyConversations'

const PropertyScreen = observer(() => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
//   const router = useRouter()
  const { propertyId }: { propertyId: string } = useLocalSearchParams();

  const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === propertyId);

  return (
    <Surface style={styles.screen}>
      <View style={{
        flex: 1,
        width: '100%',
        gap: 16,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
            {/* <Text>Property {property?.name}</Text> */}
            <PropertyInfo id={propertyId}></PropertyInfo>
            <PropertyDocuments id={propertyId}></PropertyDocuments>
            <PropertyConversations id={propertyId}></PropertyConversations>
            <FAB
                icon="square-edit-outline"
                style={{
                    position: 'absolute',
                    marginRight: 16,
                    marginBottom: 32,
                    right: 0,
                    bottom: 0,
                }}
                // onPress={() => router.push(`/chat/new?propertyId=${propertyId}`)}
                onPress={() => router.push(`/search?chatId=new&propertyId=${propertyId}`)}
            />
      </View>
    </Surface>
  );
});

export default PropertyScreen
