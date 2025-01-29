import { Avatar, Card, Chip, Divider, List, Text } from 'react-native-paper'

import { Locales } from '@/lib/locales'

import GradientBackground from './GradientBackground'
import { observer } from 'mobx-react-lite';
import Property from '@/lib/models/property';
import rootStore from '@/lib/stores/root-store';
import Conversation from '@/lib/models/conversation';
import { useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';

const PropertyConversations = observer((props: { id: string; }) => {
  const [expanded, setExpanded] = useState(true);
  const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === props.id);

  return (
    <List.Accordion
      title={Locales.t('conversations')}
      key="3"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={props => <List.Icon {...props} icon="chat-outline" />}
    >
      { property?.conversations.map((conversation: Conversation) =>
        <View key={conversation.id + '-view'} style={{ padding: 0 }}>
          <List.Item
            title={conversation.label}
            // onPress={() => router.push(`/chat/${conversation.id}?propertyId=${property.id}`)}
            onPress={() => router.push(`/search?chatId=${conversation.id}&propertyId=${property.id}`)}
            key={conversation.id + '-item'}
          />
          <Divider key={conversation.id + '-divider'} />
        </View>
      )}
      { !property?.conversations?.length &&
        <List.Item
          key="noConversation"
          title={Locales.t('noConversations')}
          titleStyle={{ color: '#aaa' }}
        />
      }
    </List.Accordion>
  );
});

export default PropertyConversations;
