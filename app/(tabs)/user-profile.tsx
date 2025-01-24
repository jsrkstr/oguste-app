import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import rootStore from '@/lib/stores/root-store';
import User from '@/lib/models/user';
import Organization from '@/lib/models/organization';
import Apartment from '@/lib/models/apartment';
import Conversation from '@/lib/models/conversation';
import Message from '@/lib/models/message';
import Document from '@/lib/models/document';

const UserProfile = observer(() => {
  useEffect(() => {
    // Simulate fetching data and setting it in the store
    const user = new User('1', 'John Doe');
    const organization = new Organization('1', 'Acme Corp');
    const apartment = new Apartment('1', 'Apartment 101');
    const document = new Document('1', 'Lease Agreement');
    const conversation = new Conversation('1');
    const message = new Message('1', 'Hello, welcome to your new apartment!');

    conversation.addMessage(message);
    apartment.addDocument(document);
    apartment.addConversation(conversation);
    organization.addApartment(apartment);
    user.organization = organization;

    rootStore.setUser(user);
    rootStore.setOrganization(organization);
  }, []);

  return (
    <View style={{
        backgroundColor: 'white',
    }}>
      <Text>User: {rootStore.user?.name}</Text>
      <Text>Organization: {rootStore.organization?.name}</Text>
      {rootStore.organization?.apartments.map((apartment) => (
        <View key={apartment.id}>
          <Text>Apartment: {apartment.name}</Text>
          {apartment.documents.map((doc) => (
            <Text key={doc.id}>Document: {doc.title}</Text>
          ))}
          {apartment.conversations.map((conv) => (
            <View key={conv.id}>
              <Text>Conversation ID: {conv.id}</Text>
              {conv.messages.map((msg) => (
                <Text key={msg.id}>Message: {msg.content}</Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
});

export default UserProfile;
