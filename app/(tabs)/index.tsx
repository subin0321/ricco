import { Colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleLogin = () => {
    router.push('/info_input');
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/bg_gradient.png')}
        style={styles.backgroundImage}
      />
      
      <View style={styles.contentContainer}>
        <Image 
          source={require('@/assets/images/logo.png')}
          style={styles.reactLogo}
        />
        <Text style={styles.subtitle}>당신의 소중한 기억을 저장하세요!</Text>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
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
    resizeMode: 'cover', // 화면을 완전히 채우도록
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    zIndex: 1, // 배경 이미지 위에 표시
  },
  reactLogo: {
    width: 250,
    height: 120,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    position: 'absolute',
    backgroundColor: '#4A90E2',
    bottom: 100,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    borderWidth : 1,
    borderColor :'black',
    
    elevation: 3,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});