import { Avatar, Card, Chip, List, Text } from 'react-native-paper'

import { Locales } from '@/lib/locales'

import GradientBackground from './GradientBackground'
import { observer } from 'mobx-react-lite';
import Property from '@/lib/models/property';
import rootStore from '@/lib/stores/root-store';
import { useState } from 'react';
import Document from '@/lib/models/document';

const PropertyDocuments = observer((props: { id: string; }) => {
  const [expanded, setExpanded] = useState(true);
  const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === props.id);

  return (
    <List.Accordion
      title={Locales.t('documents')}
      id="2"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={props => <List.Icon {...props} icon="folder-outline" />}
    >
     { property?.documents.map((document: Document) =>
        <List.Item
          title={document.summary}
          style={{ borderBottomWidth: 1, borderBottomColor: "#ccc" }}
        />
      )}
      { !property?.documents?.length &&
        <List.Item
          title={Locales.t('noDocuments')}
          titleStyle={{ color: '#aaa' }}
        />
      }
    </List.Accordion>
  );
});

export default PropertyDocuments;
