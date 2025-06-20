import { Loader } from '@/components/Loader'
import { theme } from '@/constant/theme'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { styles } from '@/styles/feed.styles'
import { Ionicons } from '@expo/vector-icons'
import { useQuery } from 'convex/react'
import { formatDistanceToNow } from 'date-fns'
import { Image } from 'expo-image'
import { Link } from 'expo-router'
import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'



type Notification = {
  _id: string;
  type: "like" | "follow" | "comment";
  comment?: string;
  _creationTime: number;
  post: {
    _id: Id<"posts">;
    imageUrl: string;
    caption?: string; // changed from caption: string to caption?: string
    _creationTime: number;
  } | null;
  sender: {
    _id: string;
    fullname: string;
    image: string;
  };
};


export default function notification() {

  const notifications = useQuery(api.notifications.getNotification);

  if(notifications === undefined) return <Loader/>
  if(notifications.length === 0) return <NoNotification/>

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <FlatList 
      data={notifications} 
      renderItem={({item})=> <NotificationItem notification={item}/>} 
      keyExtractor={(item)=> item._id}
      contentContainerStyle={styles.commentContent}/>
      
    </View>
  )
}



function NotificationItem({notification}: {notification: Notification}) {

  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentContent}>

      <Link href={`/users/${notification.sender._id}` as any} asChild>
      <TouchableOpacity style={styles.commentAvatar}>
      <Image source={notification.sender.image} 
             style={styles.storyAvatar} 
              contentFit='cover'
              transition={200}/>

              <View>
              {notification.type === "like" ? (
              <Ionicons name='heart' size={14} color={theme.primary}/>
              ) : notification.type === "follow" ? (
              <Ionicons name='person-add' size={14} color="#8B5CF6"/>
              ) : (
              <Ionicons name='chatbubble' size={14} color="#3BB2F6"/>
              )}
              </View>
      </TouchableOpacity>
      
      </Link>

      <View>
      <Link href={`/notification`} asChild>
      <TouchableOpacity>
      <Text style={styles.commentUsername}>{notification.sender.fullname}</Text>
      </TouchableOpacity>
      </Link>

      <Text style={styles.commentText}>
      {notification.type === "follow" ? "started following you"
        : notification.type === "like" ? "liked your post" 
        : `commented: ${notification.comment}` }
      </Text>

      <Text style={styles.timeAgo}>{formatDistanceToNow(notification._creationTime, { addSuffix: true})}</Text>
      </View>
      </View>
      
{notification.post && (
      <Link href={`/(tabs)`} asChild>
      <TouchableOpacity>
      <Image source={notification.post.imageUrl} 
             style={styles.commentAvatar} 
             contentFit='cover'
             transition={200}/>
      </TouchableOpacity>
      </Link> 
)}
  </View>
  
  )
}



 function NoNotification() {
  return (
    <View style={styles.centered}>
      <Ionicons name='notifications-outline' size={48} color={theme.primary} />

      <Text style={{fontSize: 20, color: theme.white}}>No Notifications Yet</Text>
    </View>
  )
}


