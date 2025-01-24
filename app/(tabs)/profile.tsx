import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { View, Text } from 'react-native';
import rootStore from '@/lib/stores/root-store';
import User from '@/lib/models/user';
import { fetchUserData } from '../../lib/api/user-service';
import { router } from 'expo-router';
import { Button, Surface } from 'react-native-paper'
import { Locales, styles, ScreenInfo } from '@/lib';

const UserProfile = observer(() => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadUserData = async () => {
        try {
            setLoading(true);
            const userData = await fetchUserData();
            const user = new User(userData.id, userData.first_name, userData.last_name, userData.email);
            rootStore.setUser(user);
        } catch (err) {
            router.push('/(auth)/login');
            setError('Failed to load user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return (
        <Surface style={styles.screen}>
            <ScreenInfo title={Locales.t('profile')} path="app/(tabs)/profile.tsx" />

            <Text>Loading: {loading ? 'Yes' : 'No'}</Text>
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
            <Button mode="contained" onPress={() => loadUserData()}>
                fetch user
            </Button>
        </Surface>
    );
});

export default UserProfile;
