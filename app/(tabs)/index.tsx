import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { Link } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { theme } from '@/constant/theme';
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { STORIES } from '@/constant/mock-data';
import Story from '@/components/Story';
import { Loader } from '@/components/Loader';
import Post from '@/components/Post';

export default function index() {


const {signOut} = useAuth();

  const posts = useQuery(api.posts.getFeeds);

  if(posts === undefined) return <Loader />
  if(posts.length === 0) return <NoPostFound />
 
  

  return (
    <View style={styles.container}>

  <View style={styles.header}>
  <Text style={styles.headerTitle}>SamrtConnect</Text>
  <TouchableOpacity onPress={()=>signOut()}>
    <Ionicons  name="log-out-outline" size={24} color={theme.white} />
  </TouchableOpacity>
    </View>

<FlatList data={posts}
           renderItem={({item})=><Post post={item} />}
           keyExtractor={(item)=> item._id}
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{paddingBottom: 60}}
           ListHeaderComponent={<Stories />} />
  
    </View>
  );
}

const  NoPostFound = ()=>{

  return (
  <View style={{
    flex:1,
    backgroundColor:theme.background,
    justifyContent:"center",
    alignItems:"center",
  }}>
    <Text style={{ fontSize: 20, color: theme.primary}}>No posts yet</Text>
  </View>
  )

}


const  Stories = ()=>{

  return (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyContainer}>
{STORIES.map((story)=>(
  <Story  key={story.id} story={story}/>
))}
</ScrollView>
  )

}