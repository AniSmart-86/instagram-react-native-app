import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/styles/feed.styles';
import { formatDistanceToNow } from 'date-fns';

import { Image } from 'expo-image';

interface Comment {
content: string,
_creationTime: number,
user:{
  username: string,
  fullname: string,
  image: string,
};
}


export default function Comment({comment}:{comment: Comment}) {


  return (
    <View style={styles.commentContainer}>

      <Image source={{ uri: comment.user.image }} style={styles.commentAvatar} />
<View style={styles.commentContent}>
<Text style={styles.commentUsername}>{comment.user?.fullname}</Text>
<Text style={styles.commentText}>{comment.content}</Text>
<Text style={styles.commentTime}>
  {formatDistanceToNow(comment._creationTime, { addSuffix: true})}

</Text>
</View>
    </View>
  )
}