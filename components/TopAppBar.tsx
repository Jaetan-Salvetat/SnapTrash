import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type TopAppBarProps = {
  title: string
  showBackButton?: boolean
  showInfoButton?: boolean
  onBackPress?: () => void
  onInfoPress?: () => void
  actions?: React.ReactNode
}

export default function TopAppBar({
  title,
  showBackButton = true,
  showInfoButton = false,
  onBackPress,
  onInfoPress,
  actions
}: TopAppBarProps) {
  
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress()
    } else {
      router.back()
    }
  }
  
  const handleInfoPress = () => {
    if (onInfoPress) {
      onInfoPress()
    } else {
      router.push('/info')
    }
  }
  
  return (
    <ThemedView style={styles.appBar}>
      {showBackButton ? (
        <TouchableOpacity 
          style={styles.appBarBackButton}
          onPress={handleBackPress}
        >
          <AntDesign name="arrowleft" size={22} color="#4CAF50" />
        </TouchableOpacity>
      ) : (
        <View style={styles.appBarButtonPlaceholder} />
      )}
      
      <ThemedText style={styles.appBarTitle}>{title}</ThemedText>
      
      {actions ? (
        actions
      ) : showInfoButton ? (
        <TouchableOpacity 
          style={styles.appBarButton}
          onPress={handleInfoPress}
        >
          <AntDesign name="infocirlceo" size={22} color="#4CAF50" />
        </TouchableOpacity>
      ) : (
        <View style={styles.appBarButtonPlaceholder} />
      )}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9'
  },
  appBarTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  appBarButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 20
  },
  appBarBackButton: {
    padding: 8,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 20
  },
  appBarButtonPlaceholder: {
    width: 40,
    height: 40
  }
})
