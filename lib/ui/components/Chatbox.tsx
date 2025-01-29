import React, { useCallback } from 'react'
import { ActivityIndicator, Avatar, Button, Card, IconButton, Searchbar, Surface, Text } from 'react-native-paper'

import { Locales } from '@/lib'
import { router } from 'expo-router';
import rootStore from '@/lib/stores/root-store';
import { fetchMessages } from '@/lib/api/message-service';
import { observer } from 'mobx-react-lite';
import Message from '@/lib/models/message';
import Property from '@/lib/models/property';
import Conversation from '@/lib/models/conversation';
import { ScrollView } from 'react-native';
import MessageBox from './MessageBox';


const Chatbox = observer(({ chatId, propertyId }: { chatId?: string, propertyId?: string }) => {
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [messages, setMessages] = React.useState<Message[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = React.useState<string | undefined>();
    const [selectedProperty, setSelectedProperty] = React.useState<Property | undefined>();
    const [searchBarMode, setSearchBarMode] = React.useState<'bar' | 'view'>('bar');
    const [scrollViewRef, setScrollViewRef] = React.useState<ScrollView | null>(null);

    const sendMesage = React.useCallback((text: string) => {
        const conversation: Conversation | undefined = selectedProperty?.conversations.find((conversation) => conversation.id === chatId);
        if (conversation) {
            const newMessage = new Message('', conversation?.id, text);
            conversation?.addMessage(newMessage);
            setMessages([...messages, newMessage]);
            scrollToEnd();
        } 
    }, [messages]);

    const scrollToEnd = React.useCallback(() => {
        setTimeout(() => {
            scrollViewRef?.scrollToEnd({ animated: false });
        }, 100);
    }, [scrollViewRef]);

    React.useEffect(() => {
        
        const fetch = async (chatId: string, propertyId: string) => {
            setLoading(true);
            setMessages([]);
            try {
                console.log(Date.now());
                const messages: any = await fetchMessages(chatId);
                console.log(Date.now());
                const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === propertyId);
                setSelectedProperty(property);
    
                if (chatId !== 'new') {
                    const conversation: Conversation | undefined = property?.conversations.find((conversation) => conversation.id === chatId);
                    const models = messages?.map((message: any) => {
                        const model = new Message(message.id, message.conversation_id, message.content);
                        conversation?.addMessage(model);
                        return model;
                    })
                    setMessages(models);
                    scrollToEnd();
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            } finally {
                setLoading(false);
            }
        };

        if (chatId && propertyId && !loading) {
            fetch(chatId, propertyId);
        }

        setSelectedPropertyId(propertyId);
    }, [chatId, propertyId, rootStore.organisation?.properties]);

    return (
        <Surface style={{ flex: 1 }}>
            <Card mode="contained" style={{ margin: 16 }}>
                <Card.Title
                    style={{ minHeight: 48 }}
                    title={selectedProperty ? selectedProperty.name : Locales.t('noSelectedProperty')}
                    titleStyle={{
                        ...(selectedProperty ? {} : {
                            color: '#aaa'
                        }),
                    }}
                    // style={{ minHeight: 50 }}
                    left={(props) => (
                        loading ? <ActivityIndicator /> :
                        <Avatar.Icon
                            {...props}
                            icon="home-outline"
                            size={28}
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
                                    mode="text"
                                    style={{ marginRight: 16 }}
                                >
                                    {Locales.t('view')}
                                </Button> :
                                <Button
                                    {...props}
                                    onPress={() => router.push('/(tabs)')}
                                    mode="text"
                                    style={{ marginRight: 16 }}
                                >
                                    {Locales.t('select')}
                                </Button>
                            }
                        </>
                    )}
                />
            </Card>

            <ScrollView
                ref={(ref) => {setScrollViewRef(ref)}}
                showsVerticalScrollIndicator={false}
                style={{ marginHorizontal: 16 }}
            >
                <Text style={{ marginVertical: 16 }}>chatId - {chatId} - {selectedPropertyId}</Text>
                {messages.map((message: Message, i: number) => <>
                    { i % 2 == 0 ?
                        <Text key={message.id} style={{ marginVertical: 8 }}>{message.content}</Text>:
                        <MessageBox key={message.id} message={message}/>
                    }
                </>)
                }
            </ScrollView>
            
            <Searchbar
                value={query}
                // loading={loading}
                icon="plus"
                clearIcon="send-circle"
                onClearIconPress={() => {sendMesage(query)}}
                traileringIcon={query ? 'send-circle' : 'send-circle-outline'}
                onChangeText={(v) => setQuery(v)}
                onFocus={() => setSearchBarMode('view')}
                onBlur={() => setSearchBarMode('bar')}
                placeholder="Type here to search..."
                mode={searchBarMode}
                showDivider={false}
                style={{
                    ...(searchBarMode === 'bar' ? {
                        marginHorizontal: 16,
                        marginVertical: 16,
                    } : {}),
                }}
            />
        </Surface>
    );
});

export default Chatbox;
