// import { View, Text } from 'react-native'
// import React from 'react'
// import { useMutation } from 'convex/react'
// import { api } from '@/convex/_generated/api';
// import { Image } from 'expo-image';

// type PostDetailsProps = {
//     postId: string;

// }

// export default function postDetails({ postId }: PostDetailsProps) {

//   return (
//     <View>
//         <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Post Details</Text>
//         <Text style={{ fontSize: 16, color: 'gray' }}>This is where the post details will be displayed.</Text>
//         {/* Add more details about the post here */}

//         <View>
//             { postDetails && (
//                 <View>

//                     <Image
//                         source={{uri: ``}} // Replace with actual image URL
//                         style={{ width: '100%', height: 200, borderRadius: 10 }}
//                         contentFit='cover'
//                         transition={200}
//                         cachePolicy="memory-disk"
//                         />
//                 </View>

//             )}
//         </View>
//     </View>
//   )
// }