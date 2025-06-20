import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { theme } from '@/constant/theme'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader } from '@/components/Loader'
import { styles } from '@/styles/feed.styles'
import { Image } from 'expo-image'





export default function bookmarks() {

  const bookmarks = useQuery(api.bookmarks.getBookmarks);

  if(bookmarks === undefined) return <Loader/>
  if(bookmarks.length === 0) return <NoBookmarksFound/>
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerTitle}>Bookmarks</Text>
      </View>


      <ScrollView contentContainerStyle={{
        padding: 8,
        flexDirection: "row",
        flexWrap:"wrap",
      }}>


      {bookmarks.map((post)=>{
        if(!post) return null;
        return (
        <View key={post._id} style={{width: "33.33%", padding: 1}}>
          <Image source={post.imageUrl} 
          style={{width: "100%", aspectRatio: 1}}
          contentFit='cover' 
          transition={200} 
           cachePolicy="memory-disk" />
        </View>
        )
})}
      </ScrollView>
    </View>
  )
}





const  NoBookmarksFound = ()=>{

  return (
  <View style={{
    flex:1,
    backgroundColor:theme.background,
    justifyContent:"center",
    alignItems:"center",
  }}>
    <Text style={{ fontSize: 20, color: theme.primary}}>No Bookmarks yet</Text>
  </View>
  )

}