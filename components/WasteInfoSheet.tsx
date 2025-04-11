import React from 'react'
import { StyleSheet, Modal, TouchableOpacity, View, ScrollView } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'

type WasteInfo = {
  identification: {
    nom: string
    matériau: string
    catégorie: string
  }
  tri: {
    poubelle: string
    instructions: string
    pourquoi: string
  }
  impact: {
    temps_decomposition: string
    toxicité: string
    émissions_CO2: string
  }
  réglementation: {
    collecte_spéciale: boolean
    notes: string
  }
  conseils: string[]
}

type WasteInfoSheetProps = {
  isVisible: boolean
  onClose: () => void
  wasteInfo: WasteInfo | null
}

export default function WasteInfoSheet({ isVisible, onClose, wasteInfo }: WasteInfoSheetProps) {
  if (!wasteInfo) return null

  const getBinColorForDisplay = (poubelle: string) => {
    const colorMap: Record<string, string> = {
      'jaune': '#FFC107',
      'verte': '#4CAF50',
      'bleue': '#2196F3',
      'grise': '#9E9E9E',
      'noire': '#000000',
      'marron': '#795548'
    }
    
    // Rechercher la couleur dans le texte
    for (const [color, hex] of Object.entries(colorMap)) {
      if (poubelle.toLowerCase().includes(color)) {
        return hex
      }
    }
    
    return '#9E9E9E' // Gris par défaut
  }

  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.container} onStartShouldSetResponder={() => true} onResponderRelease={(e) => e.stopPropagation()}>
          <ThemedView style={styles.content}>
            <View style={styles.handle} />
            
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <ThemedText style={styles.closeButtonText}>Fermer</ThemedText>
            </TouchableOpacity>
            
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              <ThemedText type="title" style={styles.title}>
                {wasteInfo.identification.nom}
              </ThemedText>
              
              <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Identification</ThemedText>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Matériau</ThemedText>
                  <ThemedText>{wasteInfo.identification.matériau}</ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Catégorie</ThemedText>
                  <ThemedText>{wasteInfo.identification.catégorie}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Tri</ThemedText>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Poubelle</ThemedText>
                  <View style={styles.binRow}>
                    <View style={[styles.binColorIndicator, { backgroundColor: getBinColorForDisplay(wasteInfo.tri.poubelle) }]} />
                    <ThemedText>{wasteInfo.tri.poubelle}</ThemedText>
                  </View>
                </ThemedView>
                
                <ThemedView style={styles.infoBlock}>
                  <ThemedText style={styles.infoLabel}>Instructions</ThemedText>
                  <ThemedText>{wasteInfo.tri.instructions}</ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.infoBlock}>
                  <ThemedText style={styles.infoLabel}>Pourquoi</ThemedText>
                  <ThemedText>{wasteInfo.tri.pourquoi}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Impact environnemental</ThemedText>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Temps de décomposition</ThemedText>
                  <ThemedText>{wasteInfo.impact.temps_decomposition}</ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Toxicité</ThemedText>
                  <ThemedText>{wasteInfo.impact.toxicité}</ThemedText>
                </ThemedView>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Émissions CO2</ThemedText>
                  <ThemedText>{wasteInfo.impact.émissions_CO2}</ThemedText>
                </ThemedView>
              </ThemedView>
              
              <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Réglementation</ThemedText>
                
                <ThemedView style={styles.infoRow}>
                  <ThemedText style={styles.infoLabel}>Collecte spéciale</ThemedText>
                  <ThemedText>{wasteInfo.réglementation.collecte_spéciale ? 'Oui' : 'Non'}</ThemedText>
                </ThemedView>
                
                {wasteInfo.réglementation.collecte_spéciale && (
                  <ThemedView style={styles.infoBlock}>
                    <ThemedText style={styles.infoLabel}>Notes</ThemedText>
                    <ThemedText>{wasteInfo.réglementation.notes}</ThemedText>
                  </ThemedView>
                )}
              </ThemedView>
              
              <ThemedView style={styles.sectionContainer}>
                <ThemedText type="subtitle" style={styles.sectionTitle}>Conseils</ThemedText>
                
                {wasteInfo.conseils.map((conseil, index) => (
                  <ThemedView key={index} style={styles.tipContainer}>
                    <ThemedText style={styles.tipText}>• {conseil}</ThemedText>
                  </ThemedView>
                ))}
              </ThemedView>
              
              <View style={styles.bottomPadding} />
            </ScrollView>
          </ThemedView>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  container: {
    height: '90%',
    width: '100%',
    backgroundColor: 'transparent'
  },
  content: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: 'relative'
  },
  scrollView: {
    flex: 1,
    marginTop: 10
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center'
  },
  sectionContainer: {
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 12,
    borderRadius: 12
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 18
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 14
  },
  infoBlock: {
    marginBottom: 10
  },
  binRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  binColorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  tipContainer: {
    marginBottom: 5
  },
  tipText: {
    fontStyle: 'italic'
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'flex-end',
    width: 100
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  bottomPadding: {
    height: 50
  }
})
