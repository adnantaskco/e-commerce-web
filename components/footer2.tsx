"use client"
import React, { useState, useEffect } from 'react';

// Interface matching the response structure of /api/v1/ecommerce-pages/footer
interface FooterPage {
  slug: string;
  title: string;
}

interface FooterBottomProps {
  copyrightText?: string;
}

const FooterBottom: React.FC<FooterBottomProps> = ({ copyrightText }) => {
  const [pages, setPages] = useState<FooterPage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    fetch('https://demo.app.taskcocommerce.com/api/v1/ecommerce-pages/footer')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          if (Array.isArray(json?.data)) {
            setPages(json.data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching footer pages:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
<section className='bg-gray-900'>
<div className='container mx-auto px-4 md:px-16 '>
            <div className="py-6 border-t border-gray-800  flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
      {/* Copyright Notice */}
      <p className="text-center md:text-left">
        {copyrightText || `© ${new Date().getFullYear()} All rights reserved.`}
      </p>

      {/* Dynamic Legal & Footer Links */}
      {!loading && pages.length > 0 && (
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {pages.map((page) => (
            <li key={page.slug}>
              <a
                href={`/${page.slug}`}
                className="hover:text-gray-300 transition-colors duration-150"
              >
                {page.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
</div>
</section>
  );
};

export default FooterBottom;