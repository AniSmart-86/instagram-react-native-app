
import { theme } from '@/constant/theme';
import { Dimensions, StyleSheet } from 'react-native';



const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
      backgroundColor: theme.background,
    },
    brandSection: {
     alignItems: 'center',
     marginTop: height * 0.12,
    },
    logoContainer: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: (width * 0.4) / 2,
        backgroundColor: theme.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      },
      appName: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'jetBrainMono-Medium',
        letterSpacing: 0.5,
        marginBottom: 8,
        color: theme.primary,
      },
      tagline: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
        textTransform: 'lowercase',
        color: theme.grey,
      },
      illustrationContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      },
      illustration: {
        width: width * 0.8,
        height: width * 0.8,
        maxHeight: 280,
      },
      loginSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
      },
      googleButton: {
        width: '100%',
        backgroundColor: theme.grey,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 16,
        maxWidth: 300,
        marginBottom: 20,
        shadowColor: theme.white,
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 5,
      },
        googleIconContainer: {
         width: 24,
         height: 24,
         justifyContent: 'center',
         alignItems: 'center',
         marginRight: 12,
        },
        googleButtonText: {
         fontSize: 16,
         fontWeight: 'bold',
         color: theme.background,
        },
        termText: {
         fontSize: 14,
         color: theme.white,
         textAlign: 'center',
         maxWidth: 280,
        },
});