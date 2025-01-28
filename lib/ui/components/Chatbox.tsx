import React from 'react'
import { Avatar, Button, Card, IconButton, Searchbar, Surface, Text } from 'react-native-paper'

import { Locales } from '@/lib'
import { router } from 'expo-router';
import rootStore from '@/lib/stores/root-store';
import { fetchMessages } from '@/lib/api/message-service';
import { observer } from 'mobx-react-lite';
import Message from '@/lib/models/message';
import Property from '@/lib/models/property';
import Conversation from '@/lib/models/conversation';


const Chatbox = observer(({ chatId, propertyId }: { chatId?: string, propertyId?: string }) => {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | undefined>();
    const [selectedProperty, setSelectedProperty] = React.useState<Property | undefined>();
    const [searchBarMode, setSearchBarMode] = React.useState<'bar' | 'view'>('bar');

    React.useEffect(() => {
        const fetch = async (chatId: string, propertyId: string) => {
            setLoading(true);
            try {
                const messages = await fetchMessages(chatId);
                const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === propertyId);
                setSelectedProperty(property);

                if (chatId !== 'new') {
                    const conversation: Conversation | undefined = property?.conversations.find((conversation) => conversation.id === chatId);
                    const models = messages?.map((message) => {
                        const model = new Message(message.id, message.conversation_id, message.content);
                        conversation?.addMessage(model);
                        return model;
                    })
                    setMessages(models);
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (chatId && propertyId) {
            fetch(chatId, propertyId);
        }

        setSelectedPropertyId(propertyId);
    }, [chatId, propertyId, rootStore.organisation?.properties]);

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
            <Card mode="contained" style={{ margin: 16 }}>
                <Card.Title
                    title={selectedProperty ? selectedProperty.name : Locales.t('noSelectedProperty')}
                    titleStyle={{
                        ...(selectedProperty ? {} : {
                            color: '#aaa'
                        }),
                    }}
                    // style={{ minHeight: 50 }}
                    left={(props) => (
                        <Avatar.Icon
                            {...props}
                            icon="home-outline"
                            style={{
                                ...(selectedProperty ? {} : { backgroundColor: '#aaa' })
                            }}
                        />)}
                    right={(props) => (
                        <>
                            {selectedPropertyId ?
                                <Button
                                    {...props}
                                    onPress={() => router.push(`/property/${selectedPropertyId}`)}
                                    mode="elevated"
                                    style={{ marginRight: 16 }}
                                >
                                    {Locales.t('view')}
                                </Button> :
                                <Button
                                    {...props}
                                    onPress={() => router.push('/(tabs)')}
                                    mode="elevated"
                                    style={{ marginRight: 16 }}
                                >
                                    {Locales.t('select')}
                                </Button>
                            }
                        </>
                    )}
                />
            </Card>

            <Text>chatId - {chatId} - {selectedPropertyId}</Text>
            {messages.map((message: Message) => <>
                <Text key={message.id}>{message.content}</Text>
            </>)
            }

            <Searchbar
                value={query}
                loading={loading}
                onChangeText={(v) => setQuery(v)}
                onFocus={() => setSearchBarMode('view')}
                onBlur={() => setSearchBarMode('bar')}
                placeholder="Type here to search..."
                mode={searchBarMode}
                style={{
                    marginTop: 16,
                    ...(searchBarMode === 'bar' ? {
                        marginHorizontal: 16
                    } : {}),
                }}
            />
        </Surface>
    );
});

export default Chatbox;
