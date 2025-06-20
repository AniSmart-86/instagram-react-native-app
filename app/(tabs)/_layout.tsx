import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/constant/theme'



export default function Tablayout() {
  return (
  <Tabs screenOptions={{
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: theme.primary,
    tabBarInactiveTintColor: theme.grey,
    tabBarStyle: {
      backgroundColor: theme.surfaceLight,
      borderTopWidth: 0,
      position: 'absolute',
      paddingBottom: 8,
      left: 0,
      right: 0,
      height: 40,
      elevation: 0,
    },
  }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Home',
        tabBarIcon: ({color}) => <Ionicons name="home" size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="bookmarks"
      options={{
        title: 'Bookmarks',
        tabBarIcon: ({color}) => <Ionicons name="bookmark" size={24} color={color} />,
      }}
    />

    
    <Tabs.Screen
      name="create"
      options={{
        title: 'Create',
        tabBarIcon: ({color}) => <Ionicons name="add-circle" size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="notification"
      options={{
        title: 'Notification',
        tabBarIcon: ({color}) => <Ionicons name="notifications" size={24} color={color} />,
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
      }}
    />
  </Tabs>
  )
}