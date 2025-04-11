import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert, Dimensions } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import TopAppBar from '@/components/TopAppBar'
import { analyzeWasteImage, WasteInfo } from '@/services/openaiAPI'
import { saveToHistory } from '@/services/historyService'

declare global {
  var wasteInfo: any | null
}

const { width } = Dimensions.get('window')

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Camera permission is needed to take photos')
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
    if (!permissionResult.granted) {
      Alert.alert('Permission Required', 'Gallery permission is needed to pick photos')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const analyzeWaste = async (uri: string) => {
    try {
      setLoading(true)
      setImage(uri)
      const result = await analyzeWasteImage(uri)
      global.wasteInfo = result
      
      if (!result.erreur?.présent) {
        await saveToHistory(uri, result)
      }
      
      router.push('/waste-details')
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'analyser l\'image. Veuillez réessayer.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const goBack = () => {
    router.back()
  }

  const goToInfo = () => {
    router.push('/info')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginBottom: 10}}>
        <TopAppBar
          title="Scanner un déchet"
          showBackButton={true}
          showInfoButton={true}
          onBackPress={goBack}
          onInfoPress={goToInfo}
        />
      </View>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <View style={styles.loadingCircle}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
          <ThemedText style={styles.loadingText}>Analyse en cours</ThemedText>
          <ThemedText style={styles.loadingSubtext}>Identification du déchet...</ThemedText>
        </View>
      ) : image ? (
        <View style={styles.imageContent}>
          <View style={styles.imageFrame}>
            <Image source={{ uri: image }} style={styles.capturedImage} />
          </View>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.greenButton} onPress={() => analyzeWaste(image)}>
              <AntDesign name="search1" size={22} color="#FFFFFF" />
              <ThemedText style={styles.buttonText}>Analyser</ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.lightButton} onPress={takePhoto}>
              <AntDesign name="reload1" size={22} color="#4CAF50" />
              <ThemedText style={styles.lightButtonText}>Reprendre</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <ThemedText style={styles.headline}>Identifiez vos déchets</ThemedText>
          <ThemedText style={styles.subheadline}>Prenez une photo claire de votre déchet pour savoir comment le recycler</ThemedText>
          
          <View style={styles.choiceContainer}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <View style={styles.iconCircle}>
                <AntDesign name="camerao" size={26} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.choiceText}>Appareil photo</ThemedText>
            </TouchableOpacity>
            
            <View style={styles.divider}>
              <View style={styles.line} />
              <ThemedText style={styles.orText}>OU</ThemedText>
              <View style={styles.line} />
            </View>
            
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
              <View style={styles.iconCircle}>
                <AntDesign name="picture" size={26} color="#FFFFFF" />
              </View>
              <ThemedText style={styles.choiceText}>Galerie</ThemedText>
            </TouchableOpacity>
          </View>
          
          <View style={styles.helpSection}>
            <ThemedText style={styles.helpTitle}>Processus simple</ThemedText>
            
            <View style={styles.stepRow}>
              <ThemedText style={styles.stepNumber}>1.</ThemedText>
              <ThemedText style={styles.stepText}>Prenez une photo de votre déchet</ThemedText>
            </View>
            
            <View style={styles.stepRow}>
              <ThemedText style={styles.stepNumber}>2.</ThemedText>
              <ThemedText style={styles.stepText}>Laissez l'IA identifier le type de déchet</ThemedText>
            </View>
            
            <View style={styles.stepRow}>
              <ThemedText style={styles.stepNumber}>3.</ThemedText>
              <ThemedText style={styles.stepText}>Recevez les consignes de tri adaptées</ThemedText>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 50
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
    textAlign: 'center'
  },
  subheadline: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22
  },
  choiceContainer: {
    marginBottom: 40
  },
  cameraButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  galleryButton: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center'
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  choiceText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333333'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  orText: {
    marginHorizontal: 12,
    color: '#888888',
    fontWeight: '500'
  },
  helpSection: {
    backgroundColor: '#F9FFF9',
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50'
  },
  helpTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12
  },
  stepRow: {
    flexDirection: 'row',
    marginBottom: 8
  },
  stepNumber: {
    width: 24,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  stepText: {
    flex: 1,
    color: '#333333'
  },
  imageContent: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageFrame: {
    width: width * 0.85,
    aspectRatio: 4/3,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 30
  },
  capturedImage: {
    width: '100%',
    height: '100%'
  },
  actionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  greenButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 10
  },
  lightButton: {
    backgroundColor: '#E8F5E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  lightButtonText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  loadingCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24
  },
  loadingText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8
  },
  loadingSubtext: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center'
  }
})
