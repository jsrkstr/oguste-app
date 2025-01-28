import { useLocalSearchParams } from 'expo-router';
import Chatbox from '@/lib/ui/components/Chatbox';
import { Surface } from 'react-native-paper';
import { styles } from '@/lib';


const ChatScreen = () => {
  const { chatId, propertyId }: { chatId: string, propertyId: string } = useLocalSearchParams();

  return (
    // <Surface style={styles.screen}>
      <Chatbox chatId={chatId} propertyId={propertyId} />
    // </Surface>
  );
};

export default ChatScreen
