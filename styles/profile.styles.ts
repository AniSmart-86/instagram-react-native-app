import { theme } from "@/constant/theme";
import { Dimensions, StyleSheet } from "react-native";



const {width, height} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: theme.background,
    },

    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:16,
        paddingVertical:12,
        borderBottomWidth:0.5,
        borderBottomColor:theme.surface,
    },

    headerLeft:{
        flexDirection:"row",
        alignItems:"center"
    },
    headerRight:{
        flexDirection:"row",
        gap:16,
    },
    headerIcon:{
       padding:4,
    },
    profileInfo:{
       padding:16,
    },

avatarAndStats:{
    flexDirection:"row",
    alignItems:"center",
    marginRight:16,
},

avatar:{
    width:86,
    height:86,
    borderRadius:43,
    borderWidth:2,
    borderColor:theme.surface,
},

statsContainer:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-around"
},
actionBtns:{
    flexDirection:"row",
    gap:8,
    marginTop:8,
},

editBtn:{
flex:1,
backgroundColor:theme.surface,
padding:8,
borderRadius:8,
alignItems:"center"
},

shareBtn:{
backgroundColor:theme.surface,
padding:8,
borderRadius:8,
aspectRatio:1,
alignItems:"center",
justifyContent:"center"
},

gridItem:{
    flex:1/3,
    aspectRatio:1,
    padding:1,
},
gridImage:{
    flex:1,
},

modalContainer:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"flex-end"
},

modalContent:{
    backgroundColor:theme.background,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    padding:20,
    minHeight:400,
},
modalHeader:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:20
},

editBtnText:{
color:theme.white,
fontWeight:"600",
fontSize:14
},
modalTitle:{
color:theme.white,
fontWeight:"600",
fontSize:18
},

statsItem:{
    alignItems:"center"
},
inputContainer:{
    marginBottom:20,
},
inputLabel:{
    color:theme.grey,
    marginBottom:20,
    fontSize:14
},
input:{
    backgroundColor:theme.background,
     color:theme.white,
     borderRadius:8,
     padding:12,
     fontSize:16,
},
bioInput:{
    height:100,
    textAlignVertical:"top"
},

saveBtn:{
    backgroundColor:theme.primary,
    padding:16,
    borderRadius:8,
    alignItems:"center",
    marginTop:20
},
saveBtnText:{
   fontSize:16,
    fontWeight:"600",
    color:theme.background,
},

modalBackdrop:{
    flex:1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent:"center"
},
postDetailContainer:{
    backgroundColor:theme.background,
    maxHeight:height * 0.9,
},
postDetailHeader:{
 flexDirection:"row",
 alignItems:"center",
 justifyContent:"flex-end",
 padding:12,
 borderBottomWidth:0.5,
 borderBottomColor:theme.surface
},
postDetailImage:{
width:width,
height:width,
},

followBtn:{
    backgroundColor:theme.primary,
    paddingHorizontal:24,
    paddingVertical:8,
    borderRadius:8,
    marginTop:16,
},
followingBtn:{
    backgroundColor:theme.surface,
   borderWidth:1,
   borderColor:theme.primary,
},
followBtnText:{
    color:theme.white,
    fontSize:14,
    fontWeight:"600",
    textAlign:"center",
},

followingBtnText:{
    color:theme.white,
    textAlign:"center",
},

noPostContainer:{
    alignItems:"center",
    justifyContent:"center",
    paddingVertical:48,
    gap:12,
    flex:1,
},
noPostText:{
   fontSize:16,
   color:theme.grey
},
centered:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
},
postGrid:{
  flex:1,
  flexDirection:"row",
  flexWrap:"wrap",
  justifyContent:"space-between"
},
statNumber:{
    fontSize:17,
    fontWeight:"700",
    color:theme.white,
    marginBottom:4,
},
headerTitle:{
    fontSize:18,
    fontWeight:"600",
    color:theme.white,
},
statLabel:{
    fontSize:13,

    color:theme.grey,
  
},
name:{
    fontSize:15,
    fontWeight:"600",
    color:theme.white,
    marginBottom:4,
},
bio:{
    fontSize:14,
    color:theme.white,
    lineHeight:20,
},

    username:{
        fontSize:20,
        fontWeight:"700",
        color:theme.white,
    }

});