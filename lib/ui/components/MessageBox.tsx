import React from 'react'
import { Card, Text } from 'react-native-paper'

import { observer } from 'mobx-react-lite';
import Message from '@/lib/models/message';
import { View } from 'react-native';


const MessageBox = observer(({ message }: { message: Message }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <View style={{ alignItems: 'flex-end' }}>
            {/* <View style={{
                borderWidth: 1,
                borderRadius: 5,
                flex: 1,
                alignItems: 'flex-end'
            }}>
                <Text>{message.content}</Text>
            </View> */}
            <Card mode="contained" style={{ maxWidth: '70%', marginVertical: 8 }}>
                <Card.Content style={{ padding: 8 }}>
                    <Text>{message.content}</Text>
                </Card.Content>
            </Card>
        </View>
    );
});

export default MessageBox;
