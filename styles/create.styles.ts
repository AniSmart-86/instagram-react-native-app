import { theme } from "@/constant/theme";
import { Dimensions, StyleSheet } from "react-native";



const {width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.background
    },

    contentContainer:{
        flex: 1,
    },

    header:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.surface,
        backgroundColor: theme.surfaceLight
    },

    headerTitle:{
        fontSize: 18,
        fontWeight: "600",
        color: theme.white
    },

    shareButton:{
        paddingHorizontal: 12,
        paddingVertical: 6,
        minHeight: 60,
        alignItems: "center",
        justifyContent:"center"
    },

    shareButtonDisabled:{
        opacity:0.5
    },

    shareTextDisabled:{
        color: theme.grey
    },

    emptyImageContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap:12
    },

    emptyImageText:{
        color: theme.grey,
        fontSize: 16
    },

    content:{
        flex:1
    },

    shareText:{
        fontSize: 18,
        color: theme.primary
    },

    scrollContent:{
        flexGrow:1,
    },

    ImageSection:{
        width: width,
        height: width,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: theme.surface,
    },

    imagePreview:{
        width: "100%",
        height: "100%"
    },

    changeImageButton:{
        position: "absolute",
        bottom:16,
        right:16,
        backgroundColor: "rgba(0,0,0,0.75)",
        flexDirection:"row",
        alignItems:"center",
        padding: 8,
        borderRadius:8,
        gap:6
    },

    changeImageText:{
        color: theme.white,
        fontSize:14,
        fontWeight:"500",
    },

    contentDisabled:{
        opacity:0.7
    },

    inputSection:{
        padding: 16,
        flex: 1,
    },

    captionContainer:{
        flexDirection: "row",
        alignItems: "flex-start"
    },

    userAvatar:{
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,

    },

    captionInput:{
        flex: 1,
        color: theme.white,
        fontSize: 16,
        paddingTop: 8,
        minHeight:40,
    }
})