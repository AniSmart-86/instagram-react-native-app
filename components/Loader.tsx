import { theme } from "@/constant/theme";
import { ActivityIndicator, View } from "react-native";



export function Loader(){
    return (
        <View style={{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: theme.background,
        }}>
<ActivityIndicator size="large" color={theme.primary} />
        </View>
    );
}