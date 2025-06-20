import { theme } from "@/constant/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";


const {width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.background
    },

    header:{
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:16,
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:theme.surface
    },

    headerTitle:{
        fontSize:24,
        fontFamily:"JetBrainsMono-Medium",
        color: theme.primary
    },

    storyContainer:{
        paddingVertical:12,
        borderBottomWidth:1,
        borderBottomColor:theme.surface
    },

    storyWrapper:{
        alignItems:"center",
        marginHorizontal:8,
        width:72
    },

    storyRing:{
        width:68,
        height:68,
        borderRadius:34,
        padding:2,
        backgroundColor:theme.background,
        borderWidth:2,
        borderColor:theme.primary,
        marginBottom:4,
    },

    noStory:{
        borderColor:theme.grey,
    },
    storyAvatar:{
        width:60,
        height:60,
        borderRadius:30,
        borderWidth:2,
        borderColor:theme.background,
    },

    storyUsername:{
        fontSize:11,
        color:theme.white,
        textAlign:"center"
    },

    post:{
        marginBottom:16
    },

    postHeader:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        padding:12
    },

    postHeaderLeft:{
        flexDirection:"row",
        alignItems:"center"
    },

    postAvatar:{
        width:32,
        height:32,
        borderRadius:16,
        marginRight:8
    },

    postUsername:{
        fontSize:14,
        fontWeight:"600",
        color: theme.white
    },

    postImage:{
        width: width,
        height: width
    },

    postActions:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:12,
        paddingVertical:12,
    },

    postActionLeft:{
        flexDirection:"row",
        alignItems:"center",
        gap:16,

    },

    postInfo:{
        paddingHorizontal:12,
    },

    likeText:{
        fontSize:14,
        fontWeight:"600",
        color:theme.white,
        marginBottom:6,
    },

    captionConatiner:{
        flexDirection:"row",
        flexWrap:"wrap",
        marginBottom:6
    },

    captionUsername:{
        fontSize:14,
        fontWeight:"600",
        color:theme.white,
        marginRight:6
    },

    captionText:{
        fontSize:14,
        color:theme.white,
        flex:1
    },

    commentsText:{
        fontSize:14,
        color:theme.grey,
        marginBottom:4
    },

    timeAgo:{
        fontSize:12,
        color:theme.grey,
        marginBottom:8
    },

    modalContainer:{
        backgroundColor:theme.background,
        marginBottom: Platform.OS === "ios" ? 44 : 0,
        flex:1,
        marginTop: Platform.OS === "ios" ? 44 : 0,
    },

    modalHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:16,
        height:56,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.surface,
    },

    modalTitle:{
        color: theme.white,
        fontSize:16,
        fontWeight:"600"
    },

    commentList:{
        flex:1
    },

    commentContainer:{
        flexDirection:"row",
        paddingHorizontal:16,
        paddingVertical:12,
        borderBottomWidth:0.5,
        borderBottomColor: theme.surface
    },

    commentAvatar:{
        width:32,
        height:32,
        borderRadius:16,
        marginRight:12,
    },


    commentContent:{
        flex:1
    },
    commentUsername:{
        color: theme.white,
        fontWeight:"500",
        marginBottom:4,
    },

    commentText:{
        color: theme.white,
        fontSize:14,
        lineHeight:20,
    },

    commentTime:{
        color: theme.grey,
        fontSize:12,
        marginTop:4,
    },
    commentInput:{
       flexDirection:"row",
       alignItems:"center",
       paddingHorizontal:16,
       paddingVertical:12,
       borderTopWidth:0.5,
       borderTopColor: theme.surface,
       backgroundColor:theme.background,
    },


    input:{
        flex:1,
        color:theme.white,
        paddingVertical:8,
        paddingHorizontal:16,
        marginRight:12,
        backgroundColor:theme.surface,
        borderRadius:20,
        fontSize:14,
    },

    postButton:{
        color:theme.primary,
        fontWeight:"600",
        fontSize:14,
    },

    postButtonDisabled:{
        opacity:0.5,
    },

    centered:{
        justifyContent:"center",
        alignItems:"center",
    },

});