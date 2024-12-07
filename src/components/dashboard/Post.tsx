import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Timestamp } from 'firebase/firestore';

interface PostProps {
  post: {
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
  };
}

export const Post = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <article className="bg-gray-900 rounded-xl p-4">
      <div className="flex gap-4">
        <img
          src={post.authorAvatar}
          alt={post.authorName}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">{post.authorName}</h3>
              <p className="text-gray-400 text-sm">@{post.authorUsername}</p>
            </div>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>
          
          <p className="mt-2 text-white">{post.content}</p>
          
          {post.media && post.media.length > 0 && (
            <div className={`grid gap-2 mt-4 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {post.media.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt=""
                  className="rounded-xl w-full h-48 object-cover"
                />
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-800">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{likesCount}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-400 hover:text-purple-500">
              <MessageCircle size={20} />
              <span>{post.comments}</span>
            </button>
            
            <button className="flex items-center gap-2 text-gray-400 hover:text-purple-500">
              <Share2 size={20} />
            </button>
          </div>
          
          <p className="text-gray-400 text-sm mt-2">
            {formatDistanceToNow(post.timestamp.toDate(), { locale: ptBR, addSuffix: true })}
          </p>
        </div>
      </div>
    </article>
  );
};