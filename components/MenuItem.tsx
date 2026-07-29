"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa6";

interface Category {
  id: number | string;
  name: string;
  slug?: string;
  children?: Category[];
  sub_categories?: Category[];
}

export default function MenuItem({ item, mobile }: { item: Category; mobile?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const children = item.children || item.sub_categories || [];
  const hasChildren = children.length > 0;

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        // Align dropdown right below the navbar link text (adjust -4 offset if needed)
        top: rect.bottom - 4, 
        left: rect.left,
      });
    }
    setIsOpen(true);
  };

  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between px-5 py-3 hover:bg-gray-50">
          <Link href={`/category/${item.slug}`} className="text-gray-700 font-medium text-sm flex-1">
            {item.name}
          </Link>
          {hasChildren && (
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-500">
              <FaChevronDown className={`text-xs transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
        {hasChildren && isOpen && (
          <ul className="bg-gray-50 pl-8 pr-5 py-2 space-y-1">
            {children.map((child) => (
              <li key={child.id}>
                <Link href={`/category/${child.slug || child.id}`} className="text-sm text-gray-600 block py-1">
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <li
      className="relative shrink-0 flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div ref={triggerRef} className="py-0">
        <Link
          href={`/category/${item.slug || item.id}`}
          className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
        >
          {item.name}
          {hasChildren && <FaChevronDown className="text-[10px]" />}
        </Link>
      </div>

      {/* DROPDOWN ALIGNED CLOSE TO TRIGGER */}
      {hasChildren && isOpen && (
        <div
          style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
          className="fixed z-[100] pt-0 min-w-[200px]"
        >
          <ul className="bg-white rounded-lg shadow-xl border border-gray-100 py-4">
            {children.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/category/${child.slug || child.id}`}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary transition-colors"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}