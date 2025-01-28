import React, { useState } from 'react'
import { List, Searchbar, Surface, Text } from 'react-native-paper'

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
        // flex: 2,
        width: '100%',
        gap: 16,
        // alignItems: 'center',
        // justifyContent: 'center',
      }}>
        {/* <Text>Property {property?.name}</Text> */}
            <PropertyInfo id={propertyId}></PropertyInfo>
            <PropertyDocuments id={propertyId}></PropertyDocuments>
            <PropertyConversations id={propertyId}></PropertyConversations>
      </View>
    </Surface>
  );
});

export default PropertyScreen
