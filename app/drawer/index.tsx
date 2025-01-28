import React from 'react'
import { Surface } from 'react-native-paper'

import { Locales, PropertyInfo, styles } from '@/lib'

const DrawerHome = () => (
  <Surface style={styles.screen}>
    <PropertyInfo title={Locales.t('titleHome')} path="app/drawer/index.tsx" />
  </Surface>
)

export default DrawerHome
