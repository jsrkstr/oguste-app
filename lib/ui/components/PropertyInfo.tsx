import { Avatar, Card, Chip, List, Text } from 'react-native-paper'

import { Locales } from '@/lib/locales'

import GradientBackground from './GradientBackground'
import { observer } from 'mobx-react-lite';
import Property from '@/lib/models/property';
import rootStore from '@/lib/stores/root-store';
import { useState } from 'react';

const PropertyInfo = observer((props: { id: string; }) => {
  const [expanded, setExpanded] = useState(true);
  const property: Property | undefined = rootStore.organisation?.properties.find((property) => property.id === props.id);

  if (!property) {
    return <></>;
  }

  return (
    <List.Accordion
      title="Details"
      key="details"
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
      left={props => <List.Icon {...props} icon="home-outline" />}
    >
      <List.Item
        key="name"
        title={property.name}
      />
      <List.Item
        key="desc"
        title={property.description}
      />
    </List.Accordion>
  );
});

export default PropertyInfo
