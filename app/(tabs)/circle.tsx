import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CircleScreen() {
  const [selectedTab, setSelectedTab] = useState('record');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const circleData = {
    name: '우리끼리 서클',
    description: '함께 성장하는 소중한 친구들',
    image: require('@/assets/images/circle_photo.jpg'),
    members: [
      { id: 1, name: '김리코', profileImage: require('@/assets/images/profile1.png') },
      { id: 2, name: '이민수', profileImage: require('@/assets/images/profile1.png') },
      { id: 3, name: '박지혜', profileImage: require('@/assets/images/profile1.png') },
      { id: 4, name: '최영호', profileImage: require('@/assets/images/profile1.png') },
      { id: 5, name: '정수진', profileImage: require('@/assets/images/profile1.png') },
    ],
    specialDays: [
      { id: 1, title: '처음 만난 날', date: '2024.03.15' },
      { id: 2, title: '첫 번째 여행', date: '2024.05.20' },
      { id: 3, title: '서클 창립일', date: '2024.02.28' },
      { id: 4, title: '첫 번째 생일파티', date: '2024.07.10' },
    ]
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

  const renderRecordContent = () => (
    <View style={styles.contentArea}>
      {/* 명함 */}


      {/* My Circle 섹션 */}
      <View style={styles.circleHeader}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Circle 정보 또는 404 메시지 */}
      <View style={styles.circleContent}>
        <Text style={styles.notFoundText}>404</Text>
        <Text style={styles.notFoundMessage}>지금은 레코드간  존재하지 않아요 ㅜ_ㅜ</Text>
      </View>
    </View>
  );

  const renderCircleContent = () => (
    <View style={styles.contentArea}>
       <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {/* 서클명 */}
          <Text style={styles.circleName}>{circleData.name}</Text>
          
          {/* 서클 설명 */}
          <Text style={styles.circleDescription}>{circleData.description}</Text>
          
          {/* 서클 사진 */}
          <View style={styles.circleImageContainer}>
            <Image source={circleData.image} style={styles.circleImage} />
          </View>
          
          {/* Members 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Members</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.membersContainer}
            >
              {circleData.members.map((member) => (
                <View key={member.id} style={styles.memberItem}>
                  <View style={styles.memberImageContainer}>
                    <Image source={member.profileImage} style={styles.memberImage} />
                  </View>
                  <Text style={styles.memberName}>{member.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          
          {/* Special Days 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Special Days</Text>
            <View style={styles.specialDaysContainer}>
              {circleData.specialDays.map((day) => (
                <View key={day.id} style={styles.specialDayItem}>
                  <Text style={styles.specialDayTitle}>{day.title}</Text>
                  <Text style={styles.specialDayDate}>{day.date}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
    
  );

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
          <Text style={styles.pageTitle}>Circle</Text>
        </View>

        {/* 네비게이션 바 */}
        <View style={styles.navBar}>
          <TouchableOpacity 
            style={[styles.navItem, selectedTab === 'record' && styles.navItemActive]}
            onPress={() => setSelectedTab('record')}
          >
            <Text style={[styles.navText, selectedTab === 'record' && styles.navTextActive]}>
              record
            </Text>
            {selectedTab === 'record' && <View style={[styles.underline, { width: 'record'.length * 8 }]} />}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navItem, selectedTab === 'circle' && styles.navItemActive]}
            onPress={() => setSelectedTab('circle')}
          >
            <Text style={[styles.navText, selectedTab === 'circle' && styles.navTextActive]}>
              circle
            </Text>
            {selectedTab === 'circle' && <View style={[styles.underline, { width: 'circle'.length * 8 }]} />}
          </TouchableOpacity>
        </View>

        {/* 컨텐츠 영역 */}
        {selectedTab === 'record' ? renderRecordContent() : renderCircleContent()}
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
    paddingTop: 30,
    zIndex: 1,
  },
  titleContainer: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  navBar: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'flex-start',
  },
  navItem: {
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginRight: 30,
    alignItems: 'flex-start',
    position: 'relative',
  },
  navItemActive: {
    // 활성 상태 스타일
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  navTextActive: {
    color: '#333',
    fontWeight: 'bold',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 2,
    backgroundColor: 'black',
    alignSelf: 'flex-start',
  },
  contentArea: {
    flex: 1,
  },
  businessCard: {
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'black',
    padding: 20,
    flexDirection: 'row',
    elevation: 5,
  },
  photoContainer: {
    width: 100,
    height: 120,
    marginRight: 20,
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
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
    marginBottom: 15,
  },
  logo: {
    width: 80,
    height: 30,
    resizeMode: 'contain',
  },
  infoGrid: {
    flex: 1,
    justifyContent: 'space-around',
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
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
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
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  circleContent: {
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
  circlePageContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circlePageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  circlePageDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  specialDaysContainer: {
    gap: 15,
  },
  specialDayItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    elevation: 5,
  },
  specialDayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  specialDayDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  circleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    marginBottom: 8,
  },
  circleDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 30,
  },
  circleImageContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  circleImage: {
    width: 335,
    height: 150,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  membersContainer: {
    paddingLeft: 0,
  },
  memberItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  memberImageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
  },
  memberImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
});