"use client"
import React, { useState, useEffect } from 'react';

// 1. Define explicit types for your API response data
interface SocialIcon {
  name: string;
  link: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface QuickLink {
  name: string;
  slug: string;
}

interface EcommerceSettings {
  logo?: string;
  store_name?: string;
  footer_description?: string;
  address?: string;
  contact_number?: string;
  whatsapp_number?: string; // Explicitly typed as string | undefined
  footer_email?: string;
  copy_right_text?: string;
  social_icons?: SocialIcon[];
  featured_categories?: Category[];
  quick_links?: QuickLink[];
  primary_color?: string;
  secondary_color?: string;
}

const DynamicFooter: React.FC = () => {
  // 2. Pass the interface to useState so TypeScript knows the exact type
  const [data, setData] = useState<EcommerceSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    fetch('https://demo.app.taskcocommerce.com/api/v1/ecommerce-settings')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          if (json?.data) {
            setData(json.data);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching footer data:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <footer className="bg-gray-900 py-10 text-center text-gray-400">
        Loading footer...
      </footer>
    );
  }

  if (!data) return null;

  const {
    logo,
    store_name,
    footer_description,
    address,
    contact_number,
    whatsapp_number,
    footer_email,
    social_icons,
    featured_categories,
    quick_links,
    primary_color = '#008060',
    secondary_color = '#f5a623',
  } = data;

  const formatUrl = (url?: string): string => {
    if (!url) return '#';
    return url.startsWith('http://') || url.startsWith('https://')
      ? url
      : `https://${url}`;
  };

  // 3. Helper function ensures whatsapp_number is treated safely as a string
  const formatWhatsAppNumber = (num?: string): string => {
    if (!num) return '';
    return String(num).replace(/[^0-9]/g, '');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info & Socials */}
          <div className="space-y-4">
            {logo ? (
              <img
                src={logo}
                alt={store_name || 'Store Logo'}
                className="h-12 object-contain"
              />
            ) : (
              <h2 className="text-xl font-bold text-white">
                {store_name || 'Store'}
              </h2>
            )}

            {footer_description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {footer_description}
              </p>
            )}

            {social_icons && social_icons.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {social_icons.map((icon, idx) => (
                  <a
                    key={idx}
                    href={formatUrl(icon.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="capitalize text-xs px-3 py-1.5 rounded bg-gray-800 text-gray-200 transition-colors duration-200"
                    onMouseEnter={(e) => {
                      if (primary_color) e.currentTarget.style.backgroundColor = primary_color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                    }}
                  >
                    {icon.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          {quick_links && quick_links.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quick_links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={`/${link.slug}`}
                      className="text-sm text-gray-400 hover:underline transition-colors"
                      onMouseEnter={(e) => {
                        if (secondary_color) e.currentTarget.style.color = secondary_color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Featured Categories */}
          {featured_categories && featured_categories.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white">
                Categories
              </h3>
              <ul className="space-y-2">
                {featured_categories.map((cat) => (
                  <li key={cat.id}>
                    <a
                      href={`/category/${cat.slug}`}
                      className="text-sm text-gray-400 hover:underline transition-colors"
                      onMouseEnter={(e) => {
                        if (secondary_color) e.currentTarget.style.color = secondary_color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                      }}
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              {address && (
                <li className="text-gray-400 leading-snug">{address}</li>
              )}
              {contact_number && (
                <li>
                  <span className="text-gray-400">Phone: </span>
                  <a
                    href={`tel:${contact_number}`}
                    className="text-gray-300 hover:underline"
                  >
                    {contact_number}
                  </a>
                </li>
              )}
              {whatsapp_number && (
                <li>
                  <span className="text-gray-400">WhatsApp: </span>
                  <a
                    href={`https://wa.me/${formatWhatsAppNumber(whatsapp_number)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:underline"
                  >
                    {whatsapp_number}
                  </a>
                </li>
              )}
              {footer_email && (
                <li>
                  <span className="text-gray-400">Email: </span>
                  <a
                    href={`mailto:${footer_email}`}
                    className="text-gray-300 hover:underline"
                  >
                    {footer_email}
                  </a>
                </li>
              )}
            </ul>
          </div>

        </div>


      </div>
    </footer>
  );
};

export default DynamicFooter;