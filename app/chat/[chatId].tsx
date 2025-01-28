import React from 'react'
import { Searchbar, Surface, Text } from 'react-native-paper'

import { Locales, PropertyInfo, styles } from '@/lib'
import { useLocalSearchParams } from 'expo-router';
import rootStore from '@/lib/stores/root-store';
import { fetchMessages } from '@/lib/api/message-service';
import { observer } from 'mobx-react-lite';
import Message from '@/lib/models/message';
import Property from '@/lib/models/property';
import Conversation from '@/lib/models/conversation';

const ChatScreen = observer(() => {
  const { chatId, propertyId }: { chatId: string, propertyId: string } = useLocalSearchParams();
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const messages = await fetchMessages(chatId);
        const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === propertyId);
        const conversation: Conversation | undefined = property?.conversations.find((conversation) => conversation.id === chatId);
        const models = messages?.map((message) => {
          const model = new Message(message.id, message.conversation_id, message.content);
          conversation?.addMessage(model);
          return model;
        })
        setMessages(models);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [chatId, propertyId]);

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
        autoFocus
        style={{ marginTop: 16, marginHorizontal: 16 }}
      />

      <Text>chatId - {chatId}</Text>
      { messages.map((message: Message) => <>
          <Text>{message.content}</Text>
        </>)
      }
    </Surface>
  );
});

export default ChatScreen
