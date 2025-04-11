import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

declare global {
  var wasteInfo: any | null
}

export default function HomeScreen() {

  const goToCamera = () => {
    router.push('/camera')
  }

  const goToHistory = () => {
    router.push('/history')
  }

  const goToInfo = () => {
    router.push('/info')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.appBar}>
          <ThemedText style={styles.appBarTitle}>SnapTrash</ThemedText>
          <TouchableOpacity 
            style={styles.appBarButton} 
            onPress={goToInfo}
          >
            <AntDesign name="infocirlceo" size={22} color="#4CAF50" />
          </TouchableOpacity>
        </ThemedView>
        

        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.header}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <ThemedText style={styles.welcomeTitle}>Bienvenue sur SnapTrash</ThemedText>
            <ThemedText style={styles.welcomeSubtitle}>Identifiez et recyclez vos déchets intelligemment</ThemedText>
          </ThemedView>

          <ThemedView style={styles.mainContent}>
            <TouchableOpacity style={styles.mainButton} onPress={goToCamera}>
              <AntDesign name="camerao" size={24} color="white" />
              <ThemedText style={styles.mainButtonText}>Scanner un déchet</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.historyButton} onPress={goToHistory}>
              <AntDesign name="clockcircleo" size={22} color="white" />
              <ThemedText style={styles.mainButtonText}>Historique</ThemedText>
            </TouchableOpacity>
            
            <ThemedView style={styles.featureContainer}>
              <ThemedText style={styles.featureTitle}>Fonctionnalités</ThemedText>
              
              <View style={styles.featureItem}>
                <AntDesign name="scan1" size={24} color="#4CAF50" />
                <View style={styles.featureTextContainer}>
                  <ThemedText style={styles.featureItemTitle}>Identification rapide</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Scannez n'importe quel déchet pour l'identifier</ThemedText>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <AntDesign name="infocirlceo" size={24} color="#4CAF50" />
                <View style={styles.featureTextContainer}>
                  <ThemedText style={styles.featureItemTitle}>Instructions précises</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Obtenez des conseils de tri adaptés à votre déchet</ThemedText>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <AntDesign name="earth" size={24} color="#4CAF50" />
                <View style={styles.featureTextContainer}>
                  <ThemedText style={styles.featureItemTitle}>Impact environnemental</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Découvrez l'impact de chaque déchet sur l'environnement</ThemedText>
                </View>
              </View>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.footer}>
            <ThemedText style={styles.footerText}>© 2025 SnapTrash - Tous droits réservés</ThemedText>
          </ThemedView>
        </ScrollView>
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
    padding: 0,
    backgroundColor: '#FFFFFF'
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20
  },
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
    borderBottomColor: '#E8F5E9',
    marginBottom: 10
  },
  appBarTitle: {
    color: '#4CAF50',
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  appBarButton: {
    padding: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 22
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center'
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center'
  },
  mainContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '80%',
    marginBottom: 15
  },
  historyButton: {
    backgroundColor: '#7CB342',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '80%',
    marginBottom: 30
  },
  mainButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10
  },
  featureContainer: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center'
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  featureTextContainer: {
    marginLeft: 15,
    flex: 1
  },
  featureItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5
  },
  featureItemDesc: {
    fontSize: 14,
    color: '#666666'
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9'
  },
  footerText: {
    fontSize: 12,
    color: '#888888'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  }
})
