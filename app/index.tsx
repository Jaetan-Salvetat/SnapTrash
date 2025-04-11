import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'

import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import TopAppBar from '@/components/TopAppBar'

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
      <TopAppBar
        title="SnapTrash"
        showBackButton={false}
        actions={
          <TouchableOpacity onPress={goToInfo}>
            <AntDesign name="infocirlceo" size={22} color="#4CAF50" />
          </TouchableOpacity>
        }
      />
        
      <ThemedView style={styles.container}>
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
            <ThemedView style={styles.actionCards}>
              <TouchableOpacity style={styles.mainActionCard} onPress={goToCamera}>
                <AntDesign name="camerao" size={36} color="#4CAF50" />
                <ThemedText style={styles.actionCardTitle}>Scanner</ThemedText>
                <ThemedText style={styles.actionCardSubtitle}>Identifiez un déchet</ThemedText>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryActionCard} onPress={goToHistory}>
                <AntDesign name="clockcircleo" size={36} color="#7CB342" />
                <ThemedText style={styles.actionCardTitle}>Historique</ThemedText>
                <ThemedText style={styles.actionCardSubtitle}>Vos analyses précédentes</ThemedText>
              </TouchableOpacity>
            </ThemedView>
            
            <ThemedView style={styles.featureSection}>
              <ThemedText style={styles.featureTitle}>Fonctionnalités</ThemedText>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <AntDesign name="scan1" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureItemTitle}>Identification rapide</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Scannez n'importe quel déchet pour l'identifier</ThemedText>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <AntDesign name="infocirlceo" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureItemTitle}>Instructions précises</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Obtenez des conseils de tri adaptés à votre déchet</ThemedText>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <AntDesign name="earth" size={22} color="#FFFFFF" />
                </View>
                <View style={styles.featureContent}>
                  <ThemedText style={styles.featureItemTitle}>Impact environnemental</ThemedText>
                  <ThemedText style={styles.featureItemDesc}>Découvrez l'impact écologique de chaque déchet</ThemedText>
                </View>
              </View>
            </ThemedView>
            
            <TouchableOpacity style={styles.mainButton} onPress={goToCamera}>
              <AntDesign name="camerao" size={24} color="white" />
              <ThemedText style={styles.mainButtonText}>Commencer maintenant</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          
          <ThemedView style={styles.footer}>
            <ThemedText style={styles.footerText}>© 2025 SnapTrash - Tous droits réservés</ThemedText>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get('window')

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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain'
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 10
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
    textAlign: 'center',
    maxWidth: '90%'
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  actionCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 25
  },
  mainActionCard: {
    width: '48%',
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E0F7E0'
  },
  secondaryActionCard: {
    width: '48%',
    backgroundColor: '#F0F4E8',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#E8F2D9'
  },
  actionCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 5
  },
  actionCardSubtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center'
  },
  featureSection: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
    textAlign: 'center'
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F9FFF9',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50'
  },
  featureIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  featureContent: {
    flex: 1
  },
  featureItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4
  },
  featureItemDesc: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18
  },
  mainButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 25,
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
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 25
  },
  mainButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10
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
  }
})
