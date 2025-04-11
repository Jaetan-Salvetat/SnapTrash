import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { analyzeWasteImage, WasteInfo } from '@/services/openaiAPI'
import { saveToHistory } from '@/services/historyService'

declare global {
  var wasteInfo: any | null
}

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
      allowsEditing: false,
      quality: 0.7
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
      allowsEditing: false,
      quality: 0.7
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
          <ThemedText style={styles.appBarTitle}>Capturer un déchet</ThemedText>
          <View style={{width: 44}} />
        </ThemedView>
        
        <ThemedView style={styles.subheader}>
          <ThemedText>Prenez une photo ou choisissez une image</ThemedText>
        </ThemedView>

        {loading && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingCard}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <ThemedText style={styles.loadingText}>Analyse en cours...</ThemedText>
              <ThemedText style={styles.loadingSubtext}>Identification du déchet avec l'IA</ThemedText>
            </View>
          </View>
        )}

        {image ? (
          <ThemedView style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.wasteImage} />
            <TouchableOpacity style={styles.analyzeButton} onPress={() => analyzeWaste(image)}>
              <AntDesign name="search1" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Analyser cette image</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newPhotoButton} onPress={takePhoto}>
              <AntDesign name="camerao" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Prendre une autre photo</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ) : (
          <ThemedView style={styles.actionsContainer}>
            <TouchableOpacity style={styles.button} onPress={takePhoto} disabled={loading}>
              <AntDesign name="camerao" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Prendre une photo</ThemedText>
            </TouchableOpacity>
            
            <ThemedText style={styles.orText}>ou</ThemedText>
            
            <TouchableOpacity style={styles.galleryButton} onPress={pickImage} disabled={loading}>
              <AntDesign name="picture" size={20} color="white" />
              <ThemedText style={styles.buttonText}>Choisir depuis la galerie</ThemedText>
            </TouchableOpacity>
            
            <ThemedView style={styles.instructionContainer}>
              <ThemedText type="subtitle" style={styles.instructionTitle}>Comment ça marche:</ThemedText>
              <ThemedText>1. Prenez une photo d'un déchet</ThemedText>
              <ThemedText>2. Notre IA analyse l'image</ThemedText>
              <ThemedText>3. Découvrez comment le trier correctement</ThemedText>
            </ThemedView>
          </ThemedView>
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
    padding: 0,
    backgroundColor: '#FFFFFF'
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
  backButton: {
    padding: 10,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5E9',
    borderRadius: 22
  },
  appBarTitle: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center'
  },
  subheader: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20
  },
  loadingOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
  },
  loadingCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84
  },
  loadingText: {
    marginTop: 15,
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loadingSubtext: {
    marginTop: 8,
    color: '#666666',
    fontSize: 14,
    textAlign: 'center'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  wasteImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E8F5E9'
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  analyzeButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  newPhotoButton: {
    backgroundColor: '#7CB342',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  galleryButton: {
    backgroundColor: '#7CB342',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#7CB342',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8
  },
  orText: {
    marginVertical: 10,
    color: '#666'
  },
  instructionContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderRadius: 10,
    width: '100%'
  },
  instructionTitle: {
    marginBottom: 15
  }
})
