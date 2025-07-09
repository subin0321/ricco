import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birth, setBirth] = useState('');
  const [mbti, setMbti] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();
  

  const handleLogin = () => {
    router.push('/main');
  };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진을 선택하려면 갤러리 접근 권한이 필요합니다.');
      return;
    }

    Alert.alert(
      '사진 선택',
      '사진을 어떻게 선택하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '갤러리에서 선택', onPress: pickImageFromGallery },
        { text: '카메라로 촬영', onPress: pickImageFromCamera },
      ]
    );
  };

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const pickImageFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '카메라를 사용하려면 카메라 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], 
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* 배경*/}
      <Image 
        source={require('@/assets/images/bg_gradient.png')}
        style={styles.backgroundImage}
      />
      
      <View style={styles.contentContainer}>
        {/* Profile 제목 */}
        <Text style={styles.profileTitle}>Profile</Text>
        
        {/* 사진 업로드 박스 */}
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleImageUpload}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera" size={40} color="#666" />
          )}
        </TouchableOpacity>
        
        {/* 이름 섹션 */}
        <Text style={styles.label}>NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#999"
        />
        
        {/* 나이 섹션 */}
        <Text style={styles.label}>AGE</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="나이를 입력해주세요."
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        {/* 생일 섹션 */}
        <Text style={styles.label}>Birthday</Text>
        <TextInput
          style={styles.input}
          value={birth}
          onChangeText={setBirth}
          placeholder="생일을 선택해주세요"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        {/* 생일 섹션 */}
        <Text style={styles.label}>MBTI</Text>
        <TextInput
          style={styles.input}
          value={mbti}
          onChangeText={setMbti}
          placeholder="MBTI를 입력해주세요."
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
         <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                  <Text style={styles.loginButtonText}>send</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.skyblue,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60, 
    zIndex: 1,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'left', 
  },
   imageUploadBox: {
    flex: 1,
    width: 120,
    height: 120,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start', // 왼쪽 정렬
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
  
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#4A90E2',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    elevation: 3,
  }, 
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});