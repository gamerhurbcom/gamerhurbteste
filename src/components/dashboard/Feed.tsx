import React from 'react';
import { Post } from './Post';
import { usePostsStore } from '../../store/postsStore';

export const Feed = () => {
  const { posts, loading } = usePostsStore();

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};