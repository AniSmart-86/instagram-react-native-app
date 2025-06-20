import { View, Text, TouchableOpacity, ScrollView, Pressable, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { Loader } from '@/components/Loader';
import { styles } from '@/styles/profile.styles';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constant/theme';
import { Image } from 'expo-image';

export default function UserProfileDetail() {

    const {id} = useLocalSearchParams();
    
    const profile = useQuery(api.users.getUserProfile, {id: id as Id<"users">});
    const posts = useQuery(api.posts.getPostByUser, {userId: id as Id<"users">});
    const isFollowing = useQuery(api.users.isFollowing, {followingId: id as Id<"users">});
    const toggleFollow = useMutation(api.users.toggleFollow);
    const router = useRouter();
    const handleBack =()=>{
        if(router.canGoBack()) router.back();
        router.replace("/(tabs)");
    }

    if(profile === undefined || posts === undefined || isFollowing === undefined) return <Loader/>
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
            <Ionicons name='arrow-back' size={24} color={theme.white}/>
        </TouchableOpacity>
         <Text style={styles.headerTitle}>{profile.username} </Text>
         <View style={{width:24}} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.profileInfo}>
                <View style={styles.avatarAndStats}>

                <Image source={profile.image}
                        style={styles.avatar}
                        contentFit='cover'
                        cachePolicy={"memory-disk"} />

                        <View style={styles.statsContainer}>
                            <View style={styles.statsItem}>
                        <Text style={styles.statNumber}>{profile.posts}</Text>
                        <Text style={styles.statLabel}>Posts</Text>
                            </View>
                              <View style={styles.statsItem}>
                        <Text style={styles.statNumber}>{profile.followers}</Text>
                        <Text style={styles.statLabel}>Followers</Text>
                            </View>
                              <View style={styles.statsItem}>
                        <Text style={styles.statNumber}>{profile.following}</Text>
                        <Text style={styles.statLabel}>Following</Text>
                            </View>
                        </View>
                </View>


                <Text style={styles.name}>{profile.fullname}</Text>
                {profile.bio && <Text style={styles.bio}>{profile.bio}</Text>}

                <Pressable style={[styles.followBtn, isFollowing && styles.followingBtn]}
                onPress={()=>toggleFollow({followingId: id as Id<"users">})}>

                    <Text style={[styles.followBtnText, isFollowing && styles.followingBtnText]}>{isFollowing ? "Following" : "Follow"}</Text>

                </Pressable>
            </View>

            <View style={styles.postGrid}>
            {posts.length === 0 ? (
                <View style={styles.noPostContainer}>
                    <Ionicons name='image-outline' size={24} color={theme.grey}/>
                    <Text style={styles.noPostText}>No Posts Yet</Text>
                </View>
            ) : (
                <FlatList 
                    data={posts}
                    numColumns={3}
                    scrollEnabled={false} 
                    keyExtractor={(item)=>item._id.toString()}
                    renderItem={({item})=>(
                            <TouchableOpacity style={styles.gridItem}>
                                <Image source={item.imageUrl}
                                        style={styles.gridImage}
                                        contentFit='cover'
                                        transition={200}
                                         cachePolicy={"memory-disk"}
                                        />
                            </TouchableOpacity>
                        
            )}
                        />
            )}
            </View>
        </ScrollView>
    </View>
  )
}