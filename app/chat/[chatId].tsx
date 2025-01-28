import React from 'react'
import { Searchbar, Surface, Text } from 'react-native-paper'

import { Locales, PropertyInfo, styles } from '@/lib'
import { useLocalSearchParams } from 'expo-router';

const ChatScreen = () => {
  const { chatId }: { chatId: string } = useLocalSearchParams();
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  // Search logic
  React.useEffect(() => {
    if (query !== '') {
      setLoading(true)
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [query])

  return (
    <Surface style={{ flex: 1, gap: 16 }}>
      <Searchbar
        value={query}
        loading={loading}
        onChangeText={(v) => setQuery(v)}
        placeholder="Type here to search..."
        style={{ marginTop: 16, marginHorizontal: 16 }}
      />

      <Text>chatId - {chatId}</Text>
    </Surface>
  )
}

export default ChatScreen
