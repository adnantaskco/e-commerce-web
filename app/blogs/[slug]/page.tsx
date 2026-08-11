import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogDetail {
  slug: string;
  title: string;
  media_url: string;
  created_at: string;
  short_description: string;
  description?: string;
  created_by: string | null;
}

interface ApiResponse {
  data: BlogDetail;
}

// Fetch single post by slug
async function getBlogPost(slug: string): Promise<BlogDetail | null> {
  try {
    const res = await fetch(
      `https://demo.app.taskcocommerce.com/api/v1/blogs/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    const result: ApiResponse = await res.json();
    return result.data;
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Calculate estimated reading time
  const wordCount = (post.description || post.short_description || "").replace(
    /<[^>]+>/g,
    ""
  ).split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen py-10 md:py-16 bg-background text-text-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <span className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 group-hover:-translate-x-1 transition-transform">
              <ArrowLeft size={16} />
            </span>
            Back to Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500 font-medium">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <Calendar size={14} className="text-primary" />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <User size={14} className="text-primary" />
              {post.created_by || "Admin"}
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <Clock size={14} className="text-primary" />
              {readTime} min read
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.2] text-gray-900 dark:text-white">
            {post.title}
          </h1>

          {/* Short Summary Callout */}
          {post.short_description && (
            <p className="text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-primary/5 rounded-r-lg">
              {post.short_description}
            </p>
          )}
        </header>

        {/* Featured Banner Image */}
        <div className="my-8 sm:my-10 relative h-[280px] sm:h-[400px] md:h-[480px] w-full rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 bg-gray-100">
          <img
            src={post.media_url || "/placeholder.png"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Main Body Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-xl">
          {post.description ? (
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          ) : (
            <p>{post.short_description}</p>
          )}
        </div>

        {/* Footer Divider & Actions */}
        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <Link
            href="/blogs"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← View all blog posts
          </Link>
        </div>
      </div>
    </article>
  );
}