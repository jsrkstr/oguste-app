import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import rootStore from '@/lib/stores/root-store';
import { router } from 'expo-router';
import { Avatar, Button, Card, List, Surface, Text } from 'react-native-paper'
import { Locales, styles, PropertyInfo } from '@/lib';

const TabsProperty = observer(() => {

    return (
        <Surface style={styles.screen}>
            {rootStore.organisation?.properties.map((property) => (
                <Card
                    key={property.id}
                    onPress={() => {router.push(`/property/${property.id}`)}}>
                    <Card.Title
                        title={property.name}
                        subtitle={property.description}
                        left={(props) => <Avatar.Icon {...props} icon="home-outline" />}
                    />
                </Card>
            // <List.Item
            //     title={property.name}
            //     description={property.description}
            //     style={{
            //         borderWidth: 1
            //     }}
            //     left={(props) => <List.Icon {...props} icon="home-outline" />}
            //   />
            ))}
            {/* <PropertyInfo title={Locales.t('profile')} path="app/(tabs)/index.tsx" />

            <Text>Loading: {rootStore.loading ? 'Yes' : 'No'}</Text>
            <Text>User: {rootStore.user?.first_name}</Text>
            <Text>Organisation: {rootStore.organisation?.name}</Text>
            <Text>Properties: {rootStore.organisation?.properties.length}</Text>
            {rootStore.organisation?.properties.map((property) => (
                <View key={property.id}>
                    <Text>Property: {property.name}</Text>
                    {property.documents.map((doc) => (
                        <Text key={doc.id}>Document: {doc.summary}</Text>
                    ))}
                    {property.conversations.map((conv) => (
                        <View key={conv.id}>
                            <Text>Conversation ID: {conv.id}</Text>
                            {conv.messages.map((msg) => (
                                <Text key={msg.id}>Message: {msg.content}</Text>
                            ))}
                        </View>
                    ))}
                </View>
            ))} */}
        </Surface>
    );
});

export default TabsProperty;
