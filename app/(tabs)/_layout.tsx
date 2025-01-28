import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs, router } from 'expo-router'
import { Appbar, Menu, Tooltip } from 'react-native-paper'

import { Locales, TabBar, TabsHeader } from '@/lib'
import { useState } from 'react'

const TabLayout = () => {
  const [visible, setVisible] = useState(false)

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        header: (props) => <TabsHeader navProps={props} children={undefined} />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: Locales.t('properties'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                />
              </Tooltip>
              <Tooltip title={Locales.t('titleSettings')}>
                <Appbar.Action
                  icon="cog"
                  // onPress={() => router.push('/(tabs)/discover')}
                />
              </Tooltip>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'home-city' : 'home-city-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: Locales.t('search'),
          headerRight: () => (
            <>
              <Tooltip title={Locales.t('search')}>
                <Appbar.Action
                  icon="magnify"
                  onPress={() => router.push('/search')}
                />
              </Tooltip>
              <Menu
                statusBarHeight={48}
                visible={visible}
                onDismiss={() => setVisible(false)}
                anchor={
                  <Tooltip title={Locales.t('options')}>
                    <Appbar.Action
                      icon="dots-vertical"
                      onPress={() => setVisible(true)}
                    />
                  </Tooltip>
                }
              >
                <Menu.Item
                  title={Locales.t('titleSettings')}
                  leadingIcon="cog"
                  onPress={() => router.push('/(tabs)/discover')}
                />
                <Menu.Item
                  title={Locales.t('stackNav')}
                  leadingIcon="card-multiple-outline"
                  onPress={() => router.push('/modal')}
                />
                <Menu.Item
                  title={Locales.t('drawerNav')}
                  leadingIcon="gesture-swipe"
                  onPress={() => router.push('/drawer')}
                />
              </Menu>
            </>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'comment-search' : 'comment-search-outline'}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: Locales.t('news'),
          headerRight: () => (
            <Tooltip title={Locales.t('drawerNav')}>
              <Appbar.Action
                icon="gesture-swipe"
                onPress={() => router.push('/drawer')}
              />
            </Tooltip>
          ),
          tabBarIcon: (props) => (
            <MaterialCommunityIcons
              {...props}
              size={24}
              name={props.focused ? 'newspaper-variant' : 'newspaper-variant-outline'}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout
