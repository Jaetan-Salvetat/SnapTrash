import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, FlatList, Alert, Text } from 'react-native'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { HistoryItem, clearHistory, deleteHistoryItem, getHistory } from '@/services/historyService'
import { WasteInfo } from '@/services/openaiAPI'

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    const historyData = await getHistory()
    setHistory(historyData)
    setLoading(false)
  }

  const handleViewDetails = (item: HistoryItem) => {
    global.wasteInfo = item.wasteInfo
    router.push('/waste-details')
  }

  const handleDeleteItem = (id: string) => {
    Alert.alert(
      'Supprimer',
      'Êtes-vous sûr de vouloir supprimer cet élément de l\'historique ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            await deleteHistoryItem(id)
            loadHistory()
          }
        }
      ]
    )
  }

  const handleClearHistory = () => {
    Alert.alert(
      'Tout supprimer',
      'Êtes-vous sûr de vouloir supprimer tout l\'historique ? Cette action est irréversible.',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer tout',
          style: 'destructive',
          onPress: async () => {
            await clearHistory()
            loadHistory()
          }
        }
      ]
    )
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }

  const goBack = () => {
    router.back()
  }

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity 
      style={styles.historyItem} 
      onPress={() => handleViewDetails(item)}
    >
      <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <ThemedText style={styles.itemTitle}>
          {item.wasteInfo.identification?.nom || 'Déchet inconnu'}
        </ThemedText>
        <ThemedText style={styles.itemCategory}>
          {item.wasteInfo.identification?.catégorie || 'Catégorie inconnue'}
        </ThemedText>
        <ThemedText style={styles.itemDate}>
          {formatDate(item.timestamp)}
        </ThemedText>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <AntDesign name="delete" size={20} color="#E53935" />
      </TouchableOpacity>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.appBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={goBack}
          >
            <AntDesign name="arrowleft" size={22} color="#4CAF50" />
          </TouchableOpacity>
          <ThemedText style={styles.appBarTitle}>Historique</ThemedText>
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClearHistory}
          >
            <AntDesign name="delete" size={22} color="#E53935" />
          </TouchableOpacity>
        </ThemedView>
        
        {loading ? (
          <ThemedView style={styles.centerContainer}>
            <ThemedText>Chargement de l'historique...</ThemedText>
          </ThemedView>
        ) : history.length === 0 ? (
          <ThemedView style={styles.centerContainer}>
            <AntDesign name="inbox" size={60} color="#CCCCCC" />
            <ThemedText style={styles.emptyText}>Aucun historique disponible</ThemedText>
            <ThemedText style={styles.emptySubtext}>
              Les analyses que vous effectuerez apparaîtront ici
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={history}
            renderItem={renderHistoryItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
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
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#E8F5E9'
  },
  clearButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#FFEBEE'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    color: '#333333'
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    marginTop: 10,
    textAlign: 'center'
  },
  listContainer: {
    padding: 16
  },
  historyItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#E0E0E0'
  },
  itemDetails: {
    flex: 1,
    marginLeft: 16
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333'
  },
  itemCategory: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4
  },
  itemDate: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4
  },
  deleteButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8
  }
})
