import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function ProfileScreen() {
  const [circleName, setCircleName] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [member, setMember] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const router = useRouter();
  

 const handleLogin = () => {
    // 필수 입력 필드 검증
    if (!circleName.trim()) {
      Alert.alert('알림', '서클명을 입력해주세요.');
      return;
    }
    if (!introduce.trim()) {
      Alert.alert('알림', '소개 문구를 작성해주세요.');
      return;
    }
    if (!member.trim()) {
      Alert.alert('알림', '최소 한 명 이상의 멤버가 선택되어야 합니다.');
      return;
    }
  

    // 데이터를 main 페이지로 전달
    router.push({
      pathname: '/main',
      params: {
        circleName: circleName,
        introduce: introduce,
        member: member,
        profileImage: profileImage || '',
      }
    });
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

  const handleDatePress = () => {
    setShowDatePicker(true);
  };



  const hideDatePicker = () => {
    setShowDatePicker(false);
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
        <Text style={styles.profileTitle}>Circle Create</Text>
        
        {/* 사진 업로드 박스 */}
        <TouchableOpacity style={styles.imageUploadBox} onPress={handleImageUpload}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera" size={40} color="#666" />
          )}
        </TouchableOpacity>
        
        {/* 이름 섹션 */}
        <Text style={styles.label}>Circle Name</Text>
        <TextInput
          style={styles.input}
          value={circleName}
          onChangeText={setCircleName}
          placeholder="서클명을 입력해주세요."
          placeholderTextColor="#999"
        />
        
        {/* 나이 섹션 */}
        <Text style={styles.label}>Introduce</Text>
        <TextInput
          style={styles.input}
          value={introduce}
          onChangeText={setIntroduce}
          placeholder="서클 소개를 입력해주세요."
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        {/* 생일 섹션 */}
         <Text style={styles.label}>Member</Text>
        <TextInput
          style={styles.input}
          value={member}
          onChangeText={setMember}
          placeholder="멤버를 찾아보세요."
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        {/* Send 버튼 */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <LinearGradient
            colors={['#ffffff', '#5A62F2']}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>send</Text>
          </LinearGradient>
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
    width: 335,
    height: 150,
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'center', // 가운데 정렬
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
  dateInput: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 0,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  datePickerButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  datePickerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    elevation: 3,
    alignSelf: 'center', // 가운데 정렬
    marginTop: 20,
    overflow: 'hidden', // 그라디언트가 border-radius에 맞게 잘리도록
  }, 
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});