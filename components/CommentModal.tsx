import { View, Text, Modal, KeyboardAvoidingView, Platform, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { styles } from '@/styles/feed.styles';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constant/theme';
import { Loader } from './Loader';
import Comment from './Comment';

type commentModal = {
    postId: Id<"posts">,
    visible:boolean,
    onCommentAdded: ()=> void,
    onClose: ()=> void,
}

export default function CommentModal({postId,onClose,onCommentAdded,visible}: commentModal) {

    const [newComment, setNewComment] = useState("")
    const comments = useQuery(api.comments.getComments, {postId})
    const addComments = useMutation(api.comments.addComment);

    const handleAddComments = async ()=>{
        if(!newComment.trim()) return;

        try {
            await addComments({
                content: newComment,
                postId
            });
            setNewComment("");
            onCommentAdded();
        } catch (error) {
            console.log("Error adding comment", error)
        }
    }


  return (
   <Modal visible={visible} animationType='slide' 
           transparent={true} onRequestClose={onClose} >

<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>

<View style={styles.modalHeader}>
    <TouchableOpacity onPress={onClose}>
        <Ionicons name='close' size={24} color={theme.white} />
    </TouchableOpacity>
    <Text style={styles.modalTitle}>Comments</Text>
    <View style={{width: 24}} />
</View>

{comments === undefined ? ( <Loader />) : (
    <FlatList 
    data={comments}
    keyExtractor={(item)=>item._id}
    renderItem={({ item })=> <Comment comment={item} />}
    contentContainerStyle={styles.commentList} />
)}

<View style={styles.commentInput}>
    <TextInput style={styles.input}
     placeholder='Add a comment...'
     placeholderTextColor={theme.grey}
     value={newComment}
     onChangeText={setNewComment}
     multiline />

     <TouchableOpacity onPress={handleAddComments} disabled={!newComment.trim()}>
        <Text style={[styles.postButton, !newComment.trim() && styles.postButtonDisabled]}>Post</Text>
     </TouchableOpacity>
</View>
</KeyboardAvoidingView>
   </Modal>
  )
}