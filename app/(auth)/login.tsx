import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/styles/auth.style'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/constant/theme'
import { useSSO } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

export default function login() {

    const {startSSOFlow} = useSSO();
    const router = useRouter();

    const handleGoogleSign = async()=>{
        try {
            const {createdSessionId, setActive} = await startSSOFlow({strategy: "oauth_google"});

            if(setActive && createdSessionId){
                setActive({session:createdSessionId})
                router.replace("/(tabs)")
            }
        } catch (error) {
          console.log(error)  
        }
    }
  return (
    <View style={styles.container}>
     <View style={styles.logoContainer}>
        <Ionicons name='leaf' size={32} color={theme.primary}/>
        </View>

        <Text style={styles.appName}>
            SmartConnect
        </Text>
        <Text style={styles.tagline}>
           Let's connect together
        </Text>


    <View style={styles.loginSection}>

        <TouchableOpacity
         style={styles.googleButton} 
         onPress={handleGoogleSign}
         activeOpacity={0.9}>

<View style={styles.googleIconContainer}>
    <Ionicons name='logo-google' size={25} color={theme.yellow}/>

</View>
<Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termText}>By continuing, you agree to our Terms and Privacy Policy</Text>
    </View>
    </View>


  )
}