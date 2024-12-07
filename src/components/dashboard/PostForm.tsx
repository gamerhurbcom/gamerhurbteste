import React, { useState, useRef } from 'react';
import { Image, Video, X, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePostsStore } from '../../store/postsStore';
import { toast } from 'react-hot-toast';

export const PostForm = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const { createPost } = usePostsStore();

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + media.length > 4) {
      toast.error('Você pode adicionar no máximo 4 arquivos de mídia');
      return;
    }

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
    setMedia(prev => [...prev, ...files]);
  };

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setMedia(newMedia);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && media.length === 0) return;

    setIsLoading(true);
    try {
      await createPost(content, media);
      toast.success('Post publicado com sucesso!');
      setContent('');
      setMedia([]);
      setPreviews([]);
    } catch (error) {
      toast.error('Erro ao publicar o post');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 rounded-xl p-4 mb-6">
      <div className="flex gap-4">
        <img
          src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`}
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="O que está acontecendo no mundo dos games?"
            className="w-full bg-transparent text-white resize-none focus:outline-none min-h-[100px]"
            maxLength={280}
          />
          
          {previews.length > 0 && (
            <div className={`grid gap-2 mb-4 ${previews.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  {preview.includes('video') ? (
                    <video src={preview} className="rounded-xl w-full h-48 object-cover" />
                  ) : (
                    <img src={preview} alt="" className="rounded-xl w-full h-48 object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(index)}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-black/75"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 border-t border-gray-800 pt-4">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-500 hover:text-purple-400 transition-colors"
                disabled={media.length >= 4}
              >
                <Image size={20} />
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-purple-500 hover:text-purple-400 transition-colors"
                disabled={media.length >= 4}
              >
                <Video size={20} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleMediaSelect}
                accept="image/*,video/*"
                multiple
                className="hidden"
              />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">
                {content.length}/280
              </span>
              <button
                type="submit"
                disabled={isLoading || (!content.trim() && media.length === 0)}
                className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Publicando...
                  </>
                ) : (
                  'Publicar'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};