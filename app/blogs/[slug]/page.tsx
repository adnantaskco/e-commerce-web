import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";

interface BlogDetail {
  slug: string;
  title: string;
  media_url: string;
  created_at: string;
  short_description: string;
  description?: string; // Long content field from API
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
      { cache: "no-store" } // or { next: { revalidate: 60 } }
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
  params: { slug: string };
}) {
  const post = await getBlogPost(params.slug);

  // Trigger 404 page if post doesn't exist
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen py-10 bg-background text-text-primary">
      <div className="container mx-auto px-4 lg:px-20 max-w-4xl">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          Back to Articles
        </Link>

        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-ring">
            <span className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <User size={16} />
              {post.created_by || "Admin"}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Featured Image */}
        <div className="my-8 relative h-[350px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-lg border border-background/10">
          <img
            src={post.media_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Short Summary Highlight */}
        <p className="text-lg md:text-xl font-medium text-ring leading-relaxed mb-8 border-l-4 border-primary pl-4 italic">
          {post.short_description}
        </p>

        {/* Full Article Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed space-y-4">
          {post.description ? (
            <div dangerouslySetInnerHTML={{ __html: post.description }} />
          ) : (
            <p>{post.short_description}</p>
          )}
        </div>
      </div>
    </article>
  );
}