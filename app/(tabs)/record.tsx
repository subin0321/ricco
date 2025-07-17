import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // 전달받은 데이터 사용, 기본값 설정
  const [recordName, setRecordName] = useState(params.name as string || '레코드');
  const [selectedCircle, setSelectedCircle] = useState(3); // 선택된 circle ID
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRecordInfo, setShowRecordInfo] = useState(false);
  
  // 애니메이션 참조
  const shakeAnim = useRef(new Animated.Value(0)).current;
  
  // 샘플 레코드 데이터
  const recordData = {
    name: recordName,
    description: "소중한 추억이 담긴 레코드입니다. 이 기억 속에는 특별한 순간들이 저장되어 있습니다.",
    image: require('@/assets/images/record.png'),
    group: "가족",
    tags: ["생일", "축하", "행복", "추억"]
  };

  const handleLogin = () => {
    router.push('/circle_add');
  };

  const handlePlay = () => {
    setIsPlaying(true);
    
    // 레코드 흔들림 애니메이션
    const shakeAnimation = Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]);

    shakeAnimation.start(() => {
      // 애니메이션 완료 후 레코드 정보 표시
      setShowRecordInfo(true);
      setIsPlaying(false);
    });
  };

  const handleReset = () => {
    setShowRecordInfo(false);
    shakeAnim.setValue(0);
  };

  if (showRecordInfo) {
    return (
      <View style={styles.container}>
        {/* 배경 그라디언트 이미지 */}
        <Image
          source={require('@/assets/images/bg_gradient.png')}
          style={styles.backgroundImage}
        />
        <View style={styles.contentContainer}>
          {/* 레코드 정보 표시 */}
          <View style={styles.recordInfoContainer}>
            <Text style={styles.recordInfoTitle}> {recordData.name}</Text>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>설명</Text>
              <Text style={styles.infoValue}>{recordData.description}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>그룹</Text>
              <Text style={styles.infoValue}>{recordData.group}</Text>
            </View>
            
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>태그</Text>
              <View style={styles.tagsContainer}>
                {recordData.tags.map((tag, index) => (
                  <View key={index} style={styles.tagItem}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.recordImageContainer}>
              <Image 
                source={recordData.image} 
                style={styles.recordImage} 
              />
            </View>
            
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>다시 듣기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
          <Text style={styles.helloText}>Memorys</Text>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.recordNameText}>{recordName}</Text>
          <Text style={styles.questionText}>해당 기억을 재생하시겠습니까?</Text>
          
          {/* 레코드 이미지 */}
          <View style={styles.recordImageContainer}>
            <Animated.View
              style={[
                styles.recordContainer,
                {
                  transform: [{ translateX: shakeAnim }]
                }
              ]}
            >
              <Image 
                source={require('@/assets/images/record.png')} 
                style={styles.recordImage} 
              />
            </Animated.View>
          </View>
          {/* 재생 버튼 */}

          <TouchableOpacity 
            style={[isPlaying && styles.playButtonDisabled]} 
            onPress={handlePlay}
            disabled={isPlaying}
          >
             <LinearGradient
                        colors={['#ffffff', '#5A62F2']}
                        style={styles.gradientButton}
                      >
            <Text style={styles.playButtonText}>
              {isPlaying ? '재생 중...' : '재생하기'}</Text>
            </LinearGradient>
          </TouchableOpacity>
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
    fontFamily: 'bodoni-72-oldstyle-book',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordNameText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'blacks',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'bodoni-72-oldstyle-book',
  },
  questionText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'bodoni-72-oldstyle-book',
  },
  recordImageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  recordContainer: {
    // 애니메이션을 위한 컨테이너
  },
  recordImage: {
    width: 290,
    height: 180,
    resizeMode: 'cover',
  },
  playButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    elevation: 5,
  },
  playButtonDisabled: {
 
  },
  playButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
  // 레코드 정보 화면 스타일
  recordInfoContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 0,
    padding: 20,
    margin: 10,
  },
  recordInfoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#black',
    textAlign: 'center',
    marginBottom: 60,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#black',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  tagItem: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '500',
  },
  resetButton: {
    borderWidth:1,
    borderColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
   gradientButton: {
    top:60,
    borderWidth : 1,
    borderColor : 'black',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});