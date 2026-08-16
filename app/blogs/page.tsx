"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  BookOpen,
  UserRound,
  Sparkles,
} from "lucide-react";

// ============================================================
// Types
// ============================================================

export interface BlogPost {
  title: string;
  slug: string;
  media_url: string;
  created_by: string | null;
  created_at: string;
  short_description: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BlogApiResponse {
  data: BlogPost[];
  meta: PaginationMeta;
}

// ============================================================
// Fetcher
// ============================================================

const fetcher = async (url: string): Promise<BlogApiResponse> => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }

  return res.json();
};

// ============================================================
// Helpers
// ============================================================

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getReadingTime = (text: string) => {
  const words = text?.split(/\s+/).length || 0;
  return Math.max(2, Math.ceil(words / 180));
};

const getInitials = (name: string | null) => {
  if (!name) return "A";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

// ============================================================
// Skeleton
// ============================================================

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col"
        >
          <div className="h-52 animate-pulse bg-slate-200" />

          <div className="space-y-4 p-5 flex-1">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
            <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />

            <div className="flex justify-between border-t border-slate-100 pt-4 mt-auto">
              <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Blog Card
// ============================================================

function BlogCard({
  item,
  featured = false,
}: {
  item: BlogPost;
  featured?: boolean;
}) {
  const readingTime = getReadingTime(item.short_description);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl ${
        featured ? "lg:col-span-2 lg:row-span-2" : ""
      }`}
    >
      {/* Top Image Area with Object-Cover */}
      <Link
        href={`/blogs/${item.slug}`}
        className={`relative w-full overflow-hidden bg-slate-100 ${
          featured ? "h-64 sm:h-80 lg:h-96" : "h-52 sm:h-56"
        }`}
      >
        <img
          src={item.media_url}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay for Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 opacity-80" />

        {/* Date Badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-sm">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            {formatDate(item.created_at)}
          </span>
        </div>

        {/* Featured Badge */}
        {featured && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-md">
              <Sparkles className="h-3 w-3 text-amber-400" />
              Featured
            </span>
          </div>
        )}

        {/* Floating Arrow Icon on Hover */}
        <div className="absolute right-3 top-3 z-10 flex h-9 w-9 -translate-y-2 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </Link>

      {/* Separate Body Content Area */}
      <div className={`flex flex-1 flex-col p-5 ${featured ? "lg:p-7" : ""}`}>
        {/* Meta Author & Reading Time */}
        <div className="mb-3 flex items-center gap-3 text-xs text-slate-500">
          {item.created_by && (
            <span className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                {getInitials(item.created_by)}
              </span>
              <span className="max-w-[120px] truncate font-medium">
                {item.created_by}
              </span>
            </span>
          )}

          {item.created_by && <span className="h-1 w-1 rounded-full bg-slate-300" />}

          <span className="flex items-center gap-1 text-slate-500">
            <Clock3 className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${item.slug}`}>
          <h2
            className={`font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary ${
              featured
                ? "text-xl sm:text-2xl lg:text-3xl"
                : "line-clamp-2 text-lg"
            }`}
          >
            {item.title}
          </h2>
        </Link>

        {/* Short Description */}
        <p
          className={`mt-2.5 leading-relaxed text-slate-600 ${
            featured
              ? "line-clamp-3 text-sm sm:text-base"
              : "line-clamp-2 text-sm"
          }`}
        >
          {item.short_description}
        </p>

        {/* Card Footer Link */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
            <Link
              href={`/blogs/${item.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary transition-all group-hover:gap-2.5"
            >
              Read Article
              <ArrowRight className="h-4 w-4" />
            </Link>

            <span className="text-xs font-medium text-slate-400">
              Article
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// Empty State
// ============================================================

function EmptyState() {
  return (
    <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <BookOpen className="h-7 w-7 text-primary" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900">
        No articles found
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        We don't have any blog articles available right now. Please check
        again later.
      </p>
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================

export default function BlogListing() {
  const [page, setPage] = useState<number>(1);

  const limit = 8;

  const baseUrl =
    "https://demo.app.taskcocommerce.com/api/v1/blogs";

  const { data, error, isLoading } = useSWR<BlogApiResponse>(
    `${baseUrl}?page=${page}&limit=${limit}`,
    fetcher,
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
    }
  );

  const blogs = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Our Journal
            </div>

            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Ideas, stories &{" "}
              <span className="text-primary">inspiration.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Discover useful guides, expert tips, product stories and the
              latest updates from our community.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {meta?.total ?? "..."}
                  </p>
                  <p className="text-xs text-slate-500">Articles</p>
                </div>
              </div>

              <div className="h-8 w-px bg-slate-200" />

              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <UserRound className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Community
                  </p>
                  <p className="text-xs text-slate-500">Contributors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        {/* Section Heading */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              Latest updates
            </p>

            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Explore our latest articles
            </h2>
          </div>

          {!isLoading && !error && blogs.length > 0 && (
            <div className="text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {(meta?.current_page! - 1) * (meta?.per_page || limit) + 1}
              </span>
              {" – "}
              <span className="font-bold text-slate-900">
                {Math.min(
                  (meta?.current_page || page) * (meta?.per_page || limit),
                  meta?.total || blogs.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-900">
                {meta?.total || blogs.length}
              </span>
            </div>
          )}
        </div>

        {/* Loading */}
        {isLoading && <BlogSkeleton />}

        {/* Error */}
        {error && (
          <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl font-black text-red-500">
              !
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Unable to load articles
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Something went wrong while loading the blog. Please try again
              later.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && blogs.length === 0 && <EmptyState />}

        {/* BLOG GRID */}
        {!isLoading && !error && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blogs.map((item, index) => (
                <BlogCard
                  key={item.slug || `${item.title}-${index}`}
                  item={item}
                  featured={page === 1 && index === 0}
                />
              ))}
            </div>

            {/* PAGINATION */}
            {meta && meta.last_page > 1 && (
              <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-7 sm:flex-row">
                <button
                  onClick={() =>
                    setPage((current) => Math.max(current - 1, 1))
                  }
                  disabled={page === 1}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-primary/30 hover:bg-primary/5 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-slate-200 disabled:hover:bg-white disabled:hover:text-slate-700"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from(
                    { length: meta.last_page },
                    (_, index) => index + 1
                  )
                    .filter((pageNumber) => {
                      return (
                        pageNumber === 1 ||
                        pageNumber === meta.last_page ||
                        Math.abs(pageNumber - page) <= 1
                      );
                    })
                    .map((pageNumber, index, visiblePages) => {
                      const previousPage = visiblePages[index - 1];

                      const showDots =
                        previousPage &&
                        pageNumber - previousPage > 1;

                      return (
                        <React.Fragment key={pageNumber}>
                          {showDots && (
                            <span className="px-1 text-slate-400">
                              ...
                            </span>
                          )}

                          <button
                            onClick={() => setPage(pageNumber)}
                            className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-bold transition ${
                              page === pageNumber
                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                : "border border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        </React.Fragment>
                      );
                    })}
                </div>

                <button
                  onClick={() =>
                    setPage((current) =>
                      Math.min(current + 1, meta.last_page)
                    )
                  }
                  disabled={page === meta.last_page}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}