import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 전달받은 데이터 사용, 기본값 설정
  const [name, setName] = useState(params.name as string || '김리코');
  const [age, setAge] = useState(params.age as string || '25');
  const [birth, setBirth] = useState(params.birth as string || '1999.03.15');
  const [mbti, setMbti] = useState(params.mbti as string || 'ENFP');
  const [profileImage, setProfileImage] = useState<string | null>(
    params.profileImage as string || null
  );

  // Circle 더미 데이터
  const circleData = [
    { id: 1, name: '우리끼리 서클' },
    { id: 2, name: '학교 모임' },
    { id: 3, name: 'circle1' },
    { id: 4, name: 'circle2' },
    { id: 5, name: 'circle3' },
    { id: 6, name: 'circle4' },
  ];

  const [selectedCircle, setSelectedCircle] = useState(3); // 선택된 circle ID

  const handleLogin = () => {
    router.push('/main');
  };

  const handleImageUpload = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1], // 정사각형 비율
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleCirclePress = (circleId: number) => {
    router.push({
      pathname: '/circle',
      params: { circleId }
    });
  };

  return (
    <View style={styles.container}>
      {/* 배경 그라디언트 이미지 */}
      <Image
        source={require('@/assets/images/bg_gradient.png')}
        style={styles.backgroundImage}
      />
      
      <View style={styles.contentContainer}>
        {/* 타이틀 텍스트 */}
        <View style={styles.titleContainer}>
          <Text style={styles.helloText}>Hello,</Text>
          <Text>welcome to Ricco!</Text>
        </View>

        {/* 명함 */}
        <View style={styles.businessCard}>
          {/* 왼쪽 사진 영역 */}
          <TouchableOpacity style={styles.photoContainer} onPress={handleImageUpload}>
            {profileImage ? (
              <Image 
                source={{ uri: profileImage }} 
                style={styles.profilePhoto}
                onError={() => {
                  // 이미지 로딩 실패 시에도 재시도하거나 다른 처리 가능
                  console.log('Profile image failed to load');
                }}
              />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Text style={styles.photoPlaceholderText}>사진 추가</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* 오른쪽 정보 영역 */}
          <View style={styles.infoContainer}>
            {/* 로고 */}
            <View style={styles.logoContainer}>
              <Image 
                source={require('@/assets/images/logo.png')} 
                style={styles.logo}
              />
            </View>

            {/* 정보 그리드 */}
            <View style={styles.infoGrid}>
              {/* 첫 번째 줄 */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Age</Text>
                  <Text style={styles.infoValue}>{age}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Birthday</Text>
                  <Text style={styles.infoValue}>{birth}</Text>
                </View>
              </View>

              {/* 두 번째 줄 */}
              <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{name}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>MBTI</Text>
                  <Text style={styles.infoValue}>{mbti}</Text>
                </View>
              </View>
            </View>
          </View>
          
          {/* 명함 하단 라인 이미지 */}
          <View style={styles.cardLineContainer}>
            <Image 
              source={require('@/assets/images/card_line.png')} 
              style={styles.cardLine}
            />
          </View>
        </View>
         {/* My Circle 섹션 */}
        <View style={styles.circleHeader}>
          <Text style={styles.circleTitle}>My Circle</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Circle 정보 또는 404 메시지 */}
        <View style={styles.circleContent}>
          {circleData.length > 0 ? (
            circleData.length >= 5 ? (
              <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.circleGrid}>
                  {circleData.map((circle) => (
                    <TouchableOpacity 
                      key={circle.id} 
                      style={styles.circleItem}
                      onPress={() => handleCirclePress(circle.id)}
                    >
                      <Image 
                        source={require('@/assets/images/folder.png')}
                        style={styles.folderImage}
                      />
                      <Text style={styles.circleName}>{circle.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <View style={styles.circleGrid}>
                {circleData.map((circle) => (
                  <TouchableOpacity 
                    key={circle.id} 
                    style={styles.circleItem}
                    onPress={() => handleCirclePress(circle.id)}
                  >
                    <Image 
                      source={require('@/assets/images/folder.png')}
                      style={styles.folderImage}
                    />
                    <Text style={styles.circleName}>{circle.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )
          ) : (
            <View style={styles.notFoundContainer}>
              <Text style={styles.notFoundText}>404</Text>
              <Text style={styles.notFoundMessage}>지금은 내 서클이 존재하지 않아요 ㅜ_ㅜ</Text>
            </View>
          )}
        </View>
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
  titleContainer: {
    marginBottom: 30,
  },
  helloText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 2,
    fontFamily:'bodoni-72-oldstyle-book',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  businessCard: {
    backgroundColor: 'white',
    height:210,
    borderWidth: 1.5,
    borderColor: 'black',
    padding: 20,
    flexDirection: 'row',
    elevation: 5,
    position: 'relative',
  },
  photoContainer: {
    width: 100,
    height: 120,
    marginRight: 20,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius:8,
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  photoPlaceholderText: {
    color: '#999',
    fontSize: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 125,
    height: 60,
    resizeMode: 'contain',
  },
  infoGrid: {
    flex: 1,
    justifyContent: 'center',
    gap: 3,
    bottom:10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
   
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  cardLineContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLine: {
    bottom: 13,
    width: '99.9%',
    height: 35,
    resizeMode: 'stretch',
  },
  circleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  circleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },
  circleContent: {
    flex: 1,
    paddingTop: 20,
  },
  scrollView: {
    flex: 1,
  },
  circleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 0,
  },
  circleItem: {
    width: '48%', 
    height: 100,
    marginBottom: 15,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    overflow: 'visible',
  },
  folderImage: {
    position: 'absolute',
    top: 0,
    left: -5,
    width: '120%',
    height: '140%',
    resizeMode: 'contain',
  },
  circleName: {
    bottom: 7,
    fontSize: 11,
  
    color: '#000',
    zIndex: 1,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  notFoundMessage: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});