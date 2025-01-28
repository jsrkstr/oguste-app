import { Avatar, Card, Chip, List, Text } from 'react-native-paper'

import { Locales } from '@/lib/locales'

import GradientBackground from './GradientBackground'
import { observer } from 'mobx-react-lite';
import Property from '@/lib/models/property';
import rootStore from '@/lib/stores/root-store';
import Conversation from '@/lib/models/conversation';
import { useState } from 'react';
import { router } from 'expo-router';

const PropertyConversations = observer((props: { id: string; }) => {
  const [expanded, setExpanded] = useState(true);
  const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === props.id);

  return (
    <List.Accordion
      title={Locales.t('conversations')}
      id="3"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={props => <List.Icon {...props} icon="chat-outline" />}
    >
      { property?.conversations.map((conversation: Conversation) =>
        <List.Item
          title={conversation.label}
          onPress={() => router.push(`/chat/${conversation.id}?propertyId=${props.id}`)}
          style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}
          key={conversation.id}
        />
      )}
      { !property?.conversations?.length &&
        <List.Item
          title={Locales.t('noConversations')}
          titleStyle={{ color: '#aaa' }}
        />
      }
    </List.Accordion>
  );
});

export default PropertyConversations;
