import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CircleScreen() {
  const [selectedTab, setSelectedTab] = useState('record');
  const router = useRouter();

  const circleData = {
    name: '갈비지',
    description: '함께 성장하는 소중한 친구들',
    image: require('@/assets/images/circle_photo.jpg'),
    members: [
      { id: 1, name: '박수빈', profileImage: require('@/assets/images/profile1.png') },
      { id: 2, name: '김은혜', profileImage: require('@/assets/images/profile1.png') },
      { id: 3, name: '김예진', profileImage: require('@/assets/images/profile1.png') },
      { id: 4, name: '이지우', profileImage: require('@/assets/images/profile1.png') },
      { id: 5, name: '김규림', profileImage: require('@/assets/images/profile1.png') },
      { id: 6, name: '오아린', profileImage: require('@/assets/images/profile1.png') },
    ],
    specialDays: [
      { id: 1, title: '처음 만난 날', date: '2024.03.15' },
      { id: 2, title: '첫 번째 여행', date: '2024.05.20' },
      { id: 3, title: '서클 창립일', date: '2024.02.28' },
    ]
  };

  // 예시 레코드 데이터 (실제로는 API에서 가져올 데이터)
  const recordData = [
    { id: 1, image: require('@/assets/images/record.png') },
    { id: 2, image: require('@/assets/images/record.png') },
    { id: 3, image: require('@/assets/images/record.png') },
    { id: 4, image: require('@/assets/images/record.png') },
    { id: 5, image: require('@/assets/images/record.png') },
  ];

  const handleAddRecord = () => {
    router.push('/record_add');
  };

  const renderRecordContent = () => (
    <View style={styles.contentArea}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.recordGrid}>
          {/* 첫 번째 항목: 추가 버튼 */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddRecord}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          
          {/* 레코드 이미지들 */}
          {recordData.map((record) => (
            <View key={record.id} style={styles.recordItem}>
              <Image source={record.image} style={styles.recordImage} />
            </View>
          ))}
        </View>
      </ScrollView>
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
    fontSize:24,
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
    bottom: 4,
    left: 0,
    height: 2,
    backgroundColor: 'black',
    alignSelf: 'flex-start',
  },
  contentArea: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    zIndex: 1,
  },
  // Record 페이지 스타일
  recordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  addButton: {
    width: (width - 65) / 2,
    height: (width - 185) / 2,
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
  },
  recordItem: {
    width: (width - 65) / 2,
    height: (width - 185) / 2,
    marginBottom: 10,
  },
  recordImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  // Circle 페이지 스타일
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
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
    color: 'black',
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