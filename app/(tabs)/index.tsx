import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import rootStore from '@/lib/stores/root-store';
import { router } from 'expo-router';
import { Button, Surface } from 'react-native-paper'
import { Locales, styles, ScreenInfo } from '@/lib';

const TabsProperty = observer(() => {

    return (
        <Surface style={styles.screen}>
            <ScreenInfo title={Locales.t('profile')} path="app/(tabs)/index.tsx" />

            <Text>Loading: {rootStore.loading ? 'Yes' : 'No'}</Text>
            <Text>User: {rootStore.user?.first_name}</Text>
            <Text>Organization: {rootStore.organization?.name}</Text>
            {rootStore.organization?.properties.map((property) => (
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
            ))}
        </Surface>
    );
});

export default TabsProperty;
