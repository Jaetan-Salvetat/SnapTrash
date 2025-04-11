import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import TopAppBar from '@/components/TopAppBar'

export default function InfoScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <TopAppBar title="SnapTrash - Informations" />
        
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ThemedText type="title" style={styles.title}>
            SnapTrash - Guide de recyclage
          </ThemedText>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>À propos de SnapTrash</ThemedText>
            <ThemedText>
              SnapTrash utilise l'intelligence artificielle pour identifier les déchets et fournir des informations sur leur recyclage approprié en un simple snap.
            </ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Comment ça marche</ThemedText>
            <ThemedView style={styles.bulletPoint}>
              <ThemedText>1. Prenez une photo d'un déchet</ThemedText>
            </ThemedView>
            <ThemedView style={styles.bulletPoint}>
              <ThemedText>2. Notre IA analyse l'image</ThemedText>
            </ThemedView>
            <ThemedView style={styles.bulletPoint}>
              <ThemedText>3. Recevez des informations détaillées sur le tri</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Guide des poubelles</ThemedText>
            
            <ThemedView style={styles.wasteTypeContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: '#FFC107' }]} />
              <View style={styles.wasteTypeInfo}>
                <ThemedText style={styles.wasteTypeTitle}>Poubelle jaune</ThemedText>
                <ThemedText>Emballages recyclables: plastiques, métaux, cartons</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.wasteTypeContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: '#4CAF50' }]} />
              <View style={styles.wasteTypeInfo}>
                <ThemedText style={styles.wasteTypeTitle}>Poubelle verte</ThemedText>
                <ThemedText>Verre: bouteilles, bocaux, flacons</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.wasteTypeContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: '#2196F3' }]} />
              <View style={styles.wasteTypeInfo}>
                <ThemedText style={styles.wasteTypeTitle}>Poubelle bleue</ThemedText>
                <ThemedText>Papiers: journaux, magazines, courriers</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.wasteTypeContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: '#9E9E9E' }]} />
              <View style={styles.wasteTypeInfo}>
                <ThemedText style={styles.wasteTypeTitle}>Poubelle grise</ThemedText>
                <ThemedText>Déchets non recyclables: ordures ménagères</ThemedText>
              </View>
            </ThemedView>
              
            <ThemedView style={styles.wasteTypeContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: '#795548' }]} />
              <View style={styles.wasteTypeInfo}>
                <ThemedText style={styles.wasteTypeTitle}>Poubelle marron</ThemedText>
                <ThemedText>Déchets organiques: restes alimentaires, végétaux</ThemedText>
              </View>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Impact environnemental</ThemedText>
            <ThemedText>
              Le tri correct des déchets est essentiel pour réduire notre empreinte écologique. Avec SnapTrash, nous facilitons ce processus pour économiser des ressources naturelles et réduire la pollution.
            </ThemedText>
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
    backgroundColor: '#FFFFFF'
  },

  scrollView: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 24,
    color: '#4CAF50',
    fontWeight: 'bold'
  },
  sectionContainer: {
    marginBottom: 24,
    backgroundColor: '#F9FFF9',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
    color: '#2E7D32',
    fontWeight: 'bold'
  },
  bulletPoint: {
    marginBottom: 8,
    fontSize: 16,
    color: '#333333',
    lineHeight: 22
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    overflow: 'hidden'
  },
  colorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    elevation: 1,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1
  },
  wasteTypeInfo: {
    flex: 1
  },
  wasteTypeTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
    color: '#2E7D32'
  }
})
