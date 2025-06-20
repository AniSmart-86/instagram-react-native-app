import { HeaderShownContext } from "@react-navigation/elements";
import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ClerkLoaded, ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import InitalLayout from "@/components/InitalLayout";


const publishKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if(!publishKey){
  throw new Error("Missing publishKey");
}


const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {


  

  return (
  
  <ClerkProvider tokenCache={tokenCache} publishableKey={publishKey}>
  <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
<ClerkLoaded>

<SafeAreaProvider>
  <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
  <InitalLayout />
  </SafeAreaView>
</SafeAreaProvider>
</ClerkLoaded>
  </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
