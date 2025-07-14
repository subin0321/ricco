import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RecordAddScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [tag, setTag] = useState('');
  const router = useRouter();

  // 그룹 옵션들 (실제로는 API에서 가져올 데이터)
  const groupOptions = [
    '갈비지',
    '친구들',
    '가족',
    '직장 동료',
    '기타'
  ];

  const handleSave = () => {
    // 필수 입력 필드 검증
    if (!title.trim()) {
      Alert.alert('알림', '제목을 입력해주세요.');
      return;
    }
    if (!content.trim()) {
      Alert.alert('알림', '내용을 입력해주세요.');
      return;
    }
    if (!selectedGroup) {
      Alert.alert('알림', '그룹을 선택해주세요.');
      return;
    }

    // 레코드 저장 로직 (실제로는 API 호출)
    Alert.alert(
      '저장 완료',
      '레코드가 성공적으로 저장되었습니다.',
      [
        {
          text: '확인',
          onPress: () => router.back() // 이전 페이지로 돌아가기
        }
      ]
    );
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
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prev => [...prev, ...newImages]);
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
      setSelectedImages(prev => [...prev, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const renderGroupSelector = () => (
    <View style={styles.groupSelector}>
      <Text style={styles.label}>Select Group</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.groupScrollView}>
        {groupOptions.map((group, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.groupOption,
              selectedGroup === group && styles.groupOptionSelected
            ]}
            onPress={() => setSelectedGroup(group)}
          >
            <Text style={[
              styles.groupOptionText,
              selectedGroup === group && styles.groupOptionTextSelected
            ]}>
              {group}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 배경 */}
      <Image 
        source={require('@/assets/images/bg_gradient.png')}
        style={styles.backgroundImage}
      />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* 제목 */}
          <Text style={styles.pageTitle}>Record Create</Text>
          
          {/* 기본 레코드 이미지 */}
          <View style={styles.recordImageContainer}>
            <Image 
              source={require('@/assets/images/record.png')} 
              style={styles.recordImage} 
            />
          </View>
          
          {/* Title 섹션 */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="제목을 입력해주세요."
            placeholderTextColor="#999"
          />
          
          {/* Content 섹션 */}
          <Text style={styles.label}>Content</Text>
          <TextInput
            style={[styles.input, styles.contentInput]}
            value={content}
            onChangeText={setContent}
            placeholder="내용을 입력해주세요."
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
          />

          {/* Image 추가 섹션 */}
          <Text style={styles.label}>Image 추가</Text>
          <TouchableOpacity style={styles.imageUploadButton} onPress={handleImageUpload}>
            <Ionicons name="camera" size={24} color="#666" />
            <Text style={styles.imageUploadText}>사진 추가</Text>
          </TouchableOpacity>

          {/* 선택된 이미지들 미리보기 */}
          {selectedImages.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagePreviewContainer}>
              {selectedImages.map((imageUri, index) => (
                <View key={index} style={styles.imagePreviewItem}>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity 
                    style={styles.removeImageButton} 
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Select Group 섹션 */}
          {renderGroupSelector()}

          {/* Tag 섹션 */}
          <Text style={styles.label}>Tag</Text>
          <TextInput
            style={styles.input}
            value={tag}
            onChangeText={setTag}
            placeholder="태그를 입력해주세요. (예: #친구 #여행)"
            placeholderTextColor="#999"
          />
          
          {/* Send 버튼 */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <LinearGradient
              colors={['#ffffff', '#5A62F2']}
              style={styles.gradientButton}
            >
              <Text style={styles.saveButtonText}>Add</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'left',
  },
  recordImageContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  recordImage: {
    width: 290,
    height: 180,
    resizeMode: 'cover',
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
  contentInput: {
    height: 100,
    paddingTop: 15,
  },
  imageUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'dashed',
    paddingVertical: 20,
    marginBottom: 20,
  },
  imageUploadText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  imagePreviewContainer: {
    marginBottom: 20,
  },
  imagePreviewItem: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupSelector: {
    marginBottom: 20,
  },
  groupScrollView: {
    marginTop: 8,
  },
  groupOption: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  groupOptionSelected: {
    backgroundColor: '#4A90E2',
  },
  groupOptionText: {
    fontSize: 14,
    color: '#333',
  },
  groupOptionTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 50,
    elevation: 3,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    overflow: 'hidden', // 그라디언트가 border-radius에 맞게 잘리도록
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});