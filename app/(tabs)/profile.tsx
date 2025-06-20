import { View, Text, TouchableOpacity, ScrollView, FlatList, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-expo'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { Loader } from '@/components/Loader';
import { styles } from '@/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constant/theme';
import { Image } from 'expo-image';

export default function profile() {

  const {signOut, userId} = useAuth();
  const [editModal, setEditModal] = useState(false);

  const currentUser = useQuery(api.users.getUserByClerkId, userId ? {clerkId:userId} : "skip");

  const [editProfile, setEditProfile] = useState({
    fullname: currentUser?.fullname || "",
    bio: currentUser?.bio || "",
    image: currentUser?.image || "",

  });

  const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
  const posts = useQuery(api.posts.getPostByUser,{});
  const updateProfile = useMutation(api.users.updateProfile);


  const handleSaveProfile = async()=>{
    await updateProfile(editProfile);
    setEditModal(false);
  }
  if(!currentUser || posts === undefined) return <Loader/>
  return (
    <View style={styles.container}>
      <View style={styles.header}>
    <View style={styles.headerLeft}>

      <Text style={styles.username}>{currentUser.username}</Text>
    </View>
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.headerIcon} onPress={()=> signOut()}>
        <Ionicons name='log-out-outline' size={24} color={theme.white} />
      </TouchableOpacity>
    </View>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
        <View style={styles.avatarAndStats}>
          <View>

        <Image source={currentUser.image} style={styles.avatar} contentFit='cover' transition={200} />
          </View>

      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
      <Text style={styles.statNumber}>{currentUser.posts}</Text>
      <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statsItem}>
      <Text style={styles.statNumber}>{currentUser.followers}</Text>
      <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statsItem}>
      <Text style={styles.statNumber}>{currentUser.following}</Text>
      <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>
        </View>

        <Text style={styles.name}>{currentUser.fullname}</Text>
        {currentUser.bio &&  <Text style={styles.bio}>{currentUser.bio}</Text>}
       
       <View style={styles.actionBtns}>
        <TouchableOpacity style={styles.editBtn} onPress={()=> setEditModal(true)}>
          <Text style={styles.editBtnText} >Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.editBtn}>
        <Ionicons name='share-outline' size={20} color={theme.white} />
        </TouchableOpacity>
       </View>
        </View>

        {posts.length === 0 && <NoPostFound />}


        <FlatList 
          data={posts} 
          numColumns={3} 
          scrollEnabled={false}
          renderItem={({item})=>(
          <TouchableOpacity style={styles.gridItem} onPress={()=> setSelectedPost(item)}>
          <Image source={item.imageUrl}
                  style={styles.gridImage}
                  contentFit='cover'
                  transition={200} />
          </TouchableOpacity>
          )} />
      </ScrollView>




      {/* Image modal */}
      <Modal visible={!!selectedPost}
              animationType='fade'
              transparent={true}
              onRequestClose={()=> setSelectedPost(null)}>
        <View style={styles.modalBackdrop}>
          {selectedPost && (
            <View style={styles.postDetailContainer}>
              <View style={styles.postDetailHeader}>
                <TouchableOpacity onPress={()=>setSelectedPost(null)}>
                  <Ionicons name='close' size={24} color={theme.white} />
                </TouchableOpacity>
              </View>

              <Image source={selectedPost.imageUrl} cachePolicy={"memory-disk"} style={styles.postDetailImage}/>
            </View>
          )}
        </View>
      </Modal>


      {/* Edit profile modal */}

      <Modal visible={editModal}
              animationType='slide'
              transparent={true}
              onRequestClose={()=>setEditModal(false)}
              >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                                          style={styles.modalContainer}>
                            
                            <View style={styles.modalContent}>
                              <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Edit Profile</Text>
                                <TouchableOpacity>
                                  <Ionicons name='close' size={24} color={theme.white}/>
                                </TouchableOpacity>
                              </View>

                              <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Name</Text>
                                <TextInput style={styles.input}
                                            value={editProfile.fullname}
                                            onChangeText={(text)=>setEditProfile((prev)=> ({...prev, fullname: text}))} 
                                            placeholderTextColor={theme.grey}/>
                              </View>

                              <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Bio</Text>
                                <TextInput style={[styles.input, styles.bioInput]}
                                            value={editProfile.bio}
                                            onChangeText={(text)=>setEditProfile((prev)=> ({...prev, bio: text}))} 
                                           multiline
                                           numberOfLines={4}
                                           placeholderTextColor={theme.grey}/>
                              </View>
                            <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                              <Text style={styles.saveBtnText}>Save Changes</Text>
                            </TouchableOpacity>
                             
                            </View>
                  </KeyboardAvoidingView>
                </TouchableWithoutFeedback>

      </Modal>
    </View>
  )
}


const NoPostFound = ()=>{
  return (
    <View style={{
      height:"100%",
      backgroundColor:theme.background,
      justifyContent:"center",
      alignItems:"center"
    }}>
      <Ionicons name='image-outline' size={48} color={theme.primary}/>
      <Text style={{fontSize:20, color: theme.white}}>No Posts Yet</Text>
    </View>
  )
}