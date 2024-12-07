import { create } from 'zustand';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { uploadToCloudinary } from '../lib/cloudinary';

interface Post {
  id: string;
  content: string;
  media: string[];
  authorId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  timestamp: Timestamp;
  likes: number;
  comments: number;
}

interface PostsStore {
  posts: Post[];
  loading: boolean;
  createPost: (content: string, media: File[]) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  loading: true,
  createPost: async (content: string, media: File[]) => {
    try {
      const mediaUrls = await Promise.all(media.map(file => uploadToCloudinary(file)));
      
      const user = auth.currentUser;
      if (!user) throw new Error('User not authenticated');

      await addDoc(collection(db, 'posts'), {
        content,
        media: mediaUrls,
        authorId: user.uid,
        authorName: user.displayName || 'Usuário',
        authorUsername: user.email?.split('@')[0] || 'usuario',
        authorAvatar: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`,
        timestamp: Timestamp.now(),
        likes: 0,
        comments: 0,
      });
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  likePost: async (postId: string) => {
    // To be implemented
  },
}));

// Set up real-time listener
const postsQuery = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
onSnapshot(postsQuery, (snapshot) => {
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  usePostsStore.setState({ posts, loading: false });
});