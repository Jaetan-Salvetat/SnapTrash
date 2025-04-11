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
        
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
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
            <ThemedText type="subtitle" style={styles.sectionTitle}>Déchets spéciaux</ThemedText>
            
            <ThemedView style={styles.specialWasteContainer}>
              <ThemedText style={styles.specialWasteTitle}>Piles et batteries</ThemedText>
              <ThemedText style={styles.specialWasteText}>À déposer dans les points de collecte spécifiques en magasin ou déchetterie. Contiennent des métaux lourds toxiques pour l'environnement.</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.specialWasteContainer}>
              <ThemedText style={styles.specialWasteTitle}>Médicaments</ThemedText>
              <ThemedText style={styles.specialWasteText}>À rapporter en pharmacie. Les emballages en carton et notices vont dans le tri sélectif.</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.specialWasteContainer}>
              <ThemedText style={styles.specialWasteTitle}>Équipements électroniques</ThemedText>
              <ThemedText style={styles.specialWasteText}>À déposer en magasin lors d'un nouvel achat ou en déchetterie. Contiennent des composants recyclables et des substances dangereuses.</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.specialWasteContainer}>
              <ThemedText style={styles.specialWasteTitle}>Produits chimiques</ThemedText>
              <ThemedText style={styles.specialWasteText}>Peintures, solvants, huiles de vidange : à apporter en déchetterie. Ne jamais jeter dans l'évier ou les toilettes.</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.specialWasteContainer}>
              <ThemedText style={styles.specialWasteTitle}>Textiles</ThemedText>
              <ThemedText style={styles.specialWasteText}>À déposer dans les bornes de collecte dédiées, même s'ils sont usés ou déchirés.</ThemedText>
            </ThemedView>
          </ThemedView>
          
          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Erreurs fréquentes</ThemedText>
            
            <ThemedView style={styles.errorContainer}>
              <View style={styles.errorIcon} />
              <View style={styles.errorContent}>
                <ThemedText style={styles.errorTitle}>Vaisselle cassée</ThemedText>
                <ThemedText>Bien que composée de verre, la vaisselle cassée ne va pas dans la poubelle de tri du verre mais dans les ordures ménagères.</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.errorContainer}>
              <View style={styles.errorIcon} />
              <View style={styles.errorContent}>
                <ThemedText style={styles.errorTitle}>Emballages souillés</ThemedText>
                <ThemedText>Les emballages alimentaires trop souillés (cartons de pizza gras, barquettes avec résidus) doivent être jetés avec les ordures ménagères.</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.errorContainer}>
              <View style={styles.errorIcon} />
              <View style={styles.errorContent}>
                <ThemedText style={styles.errorTitle}>Objets composites</ThemedText>
                <ThemedText>Les objets composés de plusieurs matériaux non séparables (stylos, brosses à dents) vont généralement dans les ordures ménagères.</ThemedText>
              </View>
            </ThemedView>
            
            <ThemedView style={styles.errorContainer}>
              <View style={styles.errorIcon} />
              <View style={styles.errorContent}>
                <ThemedText style={styles.errorTitle}>Films plastiques fins</ThemedText>
                <ThemedText>Dans de nombreuses communes, les films plastiques très fins ne sont pas acceptés dans le tri sélectif. Vérifiez les consignes locales.</ThemedText>
              </View>
            </ThemedView>
          </ThemedView>

          <ThemedView style={styles.sectionContainer}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Impact environnemental</ThemedText>
            <ThemedText>
              Le tri correct des déchets est essentiel pour réduire notre empreinte écologique. Avec SnapTrash, nous facilitons ce processus pour économiser des ressources naturelles et réduire la pollution.
            </ThemedText>
            
            <ThemedView style={styles.impactContainer}>
              <ThemedText style={styles.impactValue}>1 tonne</ThemedText>
              <ThemedText style={styles.impactLabel}>de papier recyclé</ThemedText>
              <ThemedText style={styles.impactResult}>sauve 17 arbres et économise 20 000 litres d'eau</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.impactContainer}>
              <ThemedText style={styles.impactValue}>1 tonne</ThemedText>
              <ThemedText style={styles.impactLabel}>de plastique recyclé</ThemedText>
              <ThemedText style={styles.impactResult}>économise 800 kg de pétrole brut</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.impactContainer}>
              <ThemedText style={styles.impactValue}>1 tonne</ThemedText>
              <ThemedText style={styles.impactLabel}>d'aluminium recyclé</ThemedText>
              <ThemedText style={styles.impactResult}>économise 95% de l'énergie nécessaire à produire de l'aluminium neuf</ThemedText>
            </ThemedView>
            
            <ThemedView style={styles.impactContainer}>
              <ThemedText style={styles.impactValue}>1 tonne</ThemedText>
              <ThemedText style={styles.impactLabel}>de verre recyclé</ThemedText>
              <ThemedText style={styles.impactResult}>économise 660 kg de sable et 100 kg de pétrole</ThemedText>
            </ThemedView>
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
    backgroundColor: '#FFFFFF'
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 40
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
  },
  specialWasteContainer: {
    marginBottom: 16,
    backgroundColor: '#E8F5E9',
    padding: 14,
    borderRadius: 8
  },
  specialWasteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#2E7D32'
  },
  specialWasteText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20
  },
  errorContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#FFF8E1',
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#FFC107'
  },
  errorIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFC107',
    marginRight: 12
  },
  errorContent: {
    flex: 1
  },
  errorTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
    color: '#F57C00'
  },
  impactContainer: {
    marginTop: 16,
    backgroundColor: '#E0F2F1',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  impactValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00897B',
    marginBottom: 4
  },
  impactLabel: {
    fontSize: 16,
    color: '#00695C',
    marginBottom: 8
  },
  impactResult: {
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontStyle: 'italic'
  }
})
