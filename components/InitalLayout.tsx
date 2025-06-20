import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "./Loader";

export default function InitialLayout() {
  const { user } = useUser();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  const createUser = useMutation(api.users.createUser);
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthScreen = segments[0] === "(auth)";

    // Redirect user based on auth state
    if (!isSignedIn && !inAuthScreen) {
      router.replace("/(auth)/login");
      return;
    }

    if (isSignedIn && inAuthScreen) {
      router.replace("/(tabs)");
    }

    // Sync user to Convex database
    const syncUser = async () => {
      if (!user) return;

      try {

        await createUser({
          username: user.username || user.id,
          fullname: user.fullName || "",
          email: user.emailAddresses[0]?.emailAddress || "",
          bio: "",
          image: user.imageUrl,
          clerkId: user.id,
        });
        
        console.log("User created or already exists");
        
        if(isUserReady === undefined) return <Loader/>
        setIsUserReady(true);
      } catch (err) {
        console.error("User creation failed:", err);
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, segments, user]);

  if (!isLoaded || (isSignedIn && !isUserReady)) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}
