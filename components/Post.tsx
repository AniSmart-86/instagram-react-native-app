import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/styles/feed.styles'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { theme } from '@/constant/theme'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import CommentModal from './CommentModal'
import { formatDistanceToNow } from 'date-fns'
import { useUser } from '@clerk/clerk-expo'
import { useLinkTo } from '@react-navigation/native'


type postProps ={
    post:{
        _id: Id<"posts">,
        imageUrl: string,
        caption?: string,
        likes: number,
        comments: number,
        _creationTime: number,
        isLiked: boolean,
        isBookmarked: boolean,
        author:{
            _id: string,
            fullname:string,
            image:string
        };
    }
}

export default function Post({post} : postProps) {


    const [isLiked, setIsLiked]= useState(post.isLiked);
    const [likeCount, setLikeCount]= useState(post.likes);
    const [isBookmarked, setIsBookmarked]= useState(post.isBookmarked);
    const [commentCount, setCommentCount]= useState(post.comments);
    const [showComments, setShowComments]= useState(false);

    const {user} = useUser();
    const currentUser = useQuery(api.users.getUserByClerkId, user ? {clerkId: user.id} : "skip")
    const toggleLike = useMutation(api.posts.toggleLikes);
    const deletePost = useMutation(api.posts.deletePost);
    const toggleBookmark = useMutation(api.bookmarks.toggleBookMarks)


    const handleLike = async ()=>{

        try {
            const newLikes = await toggleLike({postId:post._id});
            setIsLiked(newLikes);
            setLikeCount((prev)=> (newLikes ? prev + 1 : prev - 1));
        } catch (error) {
            console.log("Error toggling like", error);
        }
    }

    const handleBookmark = async ()=>{
        const newBookmarked = await toggleBookmark({postId: post._id});
        setIsBookmarked(newBookmarked);
    }

    const handleDelete = async ()=>{

        try {
            await deletePost({postId: post._id});
        } catch (error) {
            console.log("Error deleting post", error);
        }
    }

    const authorProfileUrl =
  currentUser?._id === post.author._id
    ? "/(tabs)/profile"
    : `/users/${String(post.author._id)}`;


  return (
    <View style={styles.post}>

        <View style={styles.postHeader}>
<Link href={authorProfileUrl as any} asChild>
<TouchableOpacity style={styles.postHeaderLeft}>
<Image source={post.author.image} style={styles.postAvatar} contentFit='cover' transition={200} 
 cachePolicy="memory-disk" />
      <Text style={styles.postUsername}>{post.author.fullname}</Text>
</TouchableOpacity>
</Link>

{post.author._id === currentUser?._id ? (
<TouchableOpacity onPress={handleDelete}>
    <Ionicons name='trash-outline' size={20} color={theme.primary} />
</TouchableOpacity>
) : (

<TouchableOpacity>
    <Ionicons name='ellipsis-horizontal' size={20} color={theme.white} />
</TouchableOpacity>
)}


  </View>

        <Image  source={post.imageUrl} style={styles.postImage} 
         contentFit='cover' transition={200} cachePolicy="memory-disk"/>
    
    <View style={styles.postActions}>
        <View style={styles.postActionLeft}>
<TouchableOpacity onPress={handleLike}>
    <Ionicons name={isLiked ? 'heart' : 'heart-outline'} size={24} color={isLiked ? theme.primary : theme.white} />
</TouchableOpacity>
<TouchableOpacity onPress={()=>setShowComments(true)}>
    <Ionicons name='chatbubble-outline' size={24} color={theme.white} />
</TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleBookmark}>
    <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={isBookmarked ? theme.primary : theme.white} />
</TouchableOpacity>
    </View>

    <View style={styles.postInfo}>
        <Text style={styles.likeText}>{likeCount > 0 ? `${likeCount.toLocaleString()}likes` : "Be the first to like"}</Text>
    {post.caption &&(
        <View style={styles.captionConatiner}>
            <Text style={styles.captionUsername}>{post.author.fullname}</Text>
            <Text style={styles.captionText}>{post.caption}</Text>
        </View>
    )}

    { commentCount > 0 && (<TouchableOpacity onPress={()=>setShowComments(true)}>
        <Text style={styles.commentText}>View all {commentCount} comments</Text>
    </TouchableOpacity>)}
    <Text style={styles.timeAgo}>{formatDistanceToNow(post._creationTime, {addSuffix: true})}</Text>
    </View>
    

    <CommentModal postId={post._id} visible={showComments} onClose={()=>setShowComments(false)} 
        onCommentAdded={()=> setCommentCount((prev)=> prev + 1)}/>
    </View>
  )
}