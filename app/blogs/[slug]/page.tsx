'use client';

import React, { use } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Loader2, 
  AlertCircle 
} from 'lucide-react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaLink } from 'react-icons/fa';

interface RawBlogPost {
  id?: number | string;
  title: string;
  slug: string;
  content?: string;
  short_description?: string;
  excerpt?: string;
  media_url?: string;
  image?: string;
  created_at?: string;
  read_time?: string;
  created_by?: string | null;
}

interface BlogPost {
  id?: number | string;
  title: string;
  slug: string;
  content: string;
  short_description?: string;
  excerpt?: string;
  image?: string;
  created_at?: string;
  read_time?: string;
}

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status}`);
  }
  return res.json();
};

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug;

  // Endpoint to fetch blog list or single post
  const apiUrl = slug 
    ? `https://demo.app.taskcocommerce.com/api/v1/blogs/limit/home` 
    : null;

  const { data: rawData, error, isLoading } = useSWR(apiUrl, fetcher);

  // Extract payload array/object safely
  const responseData = rawData?.data || rawData;

  // Find the exact blog matching the URL slug if response is an Array
  let targetBlog: RawBlogPost | null = null;
  if (Array.isArray(responseData)) {
    targetBlog = responseData.find((item: RawBlogPost) => item.slug === slug) || null;
  } else if (responseData && typeof responseData === 'object') {
    targetBlog = responseData;
  }

  // Normalize final blog structure for rendering
  const blog: BlogPost | null = targetBlog
    ? {
        ...targetBlog,
        image: targetBlog.media_url || targetBlog.image || undefined,
        content: targetBlog.content || targetBlog.short_description || '',
      }
    : null;

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation & Back Button */}
        <div className="mb-6">
          <Link 
            href="/blogs" 
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back To Blog
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mb-3" />
            <p className="text-sm font-medium text-gray-500">Loading blog details...</p>
          </div>
        )}

        {/* Error / Not Found State */}
        {(!isLoading && (error || !blog)) && (
          <div className="bg-white border border-red-200 rounded-2xl p-12 min-h-[400px] flex flex-col items-center justify-center text-center shadow-sm">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <h2 className="text-base sm:text-lg font-bold text-red-600">Failed to load article</h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              The requested blog post could not be found or fetched.
            </p>
          </div>
        )}

        {/* Blog Post Content */}
        {!isLoading && !error && blog && (
          <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm p-6 sm:p-10 space-y-6">
            
            {/* Title Section */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
              {blog.title}
            </h1>

            {/* Subtitle / Excerpt */}
            {(blog.excerpt || blog.short_description) && (
              <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed">
                {blog.excerpt || blog.short_description}
              </p>
            )}

            {/* Article Metadata Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-gray-100 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-4">
                {blog.created_at && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  {blog.read_time || '2 min read'}
                </span>
              </div>

              {/* Share Actions */}
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-400 text-xs mr-1 hidden sm:inline">Share:</span>
                <button type="button" className="p-2 rounded-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                  <FaFacebookF className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-2 rounded-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                  <FaTwitter className="w-3.5 h-3.5" />
                </button>
                <button type="button" className="p-2 rounded-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </button>
                <button type="button" onClick={copyToClipboard} className="p-2 rounded-full bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-gray-500 transition-colors">
                  <FaLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {blog.image && (
              <div className="relative w-full h-[220px] sm:h-[400px] rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            {/* Main Article Body */}
            <div 
              className="prose max-w-none text-gray-700 text-sm sm:text-base leading-relaxed space-y-4 pt-2"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
        )}
      </div>
    </div>
  );
}