"use client";

import { useState } from "react";
import Link from "next/link";
import { Category } from "@/app/types/category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown } from "react-icons/fa6";

interface MenuItemProps {
  item: Category;
  mobile?: boolean;
  onSelect?: () => void;
}

export default function MenuItem({ item, mobile = false, onSelect }: MenuItemProps) {
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Mobile View Rendering
  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href={`/category/${item.slug || item.id}`}
            onClick={onSelect}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors flex-1"
          >
            {item.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="p-1 text-gray-500 hover:text-primary transition-transform duration-200"
              style={{ transform: mobileSubOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              aria-label="Toggle subcategories"
            >
              <FaChevronDown className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Mobile Nested Accordion Subcategories */}
        {hasChildren && mobileSubOpen && (
          <ul className="bg-orange-50/50 border-t border-orange-100 pl-6 pr-4 py-2 space-y-2">
            {item.children?.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/category/${child.slug || child.id}`}
                  onClick={onSelect}
                  className="block text-xs font-normal text-gray-600 hover:text-primary py-1 transition-colors"
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // Desktop View with Shadcn DropdownMenu
  if (hasChildren) {
    return (
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors outline-none cursor-pointer py-1">
            <span>{item.name}</span>
            <FaChevronDown className="h-2.5 w-2.5 text-gray-400 group-hover:text-primary transition-transform duration-200" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-gray-100 p-1.5 z-50">
            {item.children?.map((child) => (
              <DropdownMenuItem key={child.id} asChild className="rounded-lg cursor-pointer focus:bg-orange-50 focus:text-primary">
                <Link
                  href={`/category/${child.slug || child.id}`}
                  className="w-full text-xs font-medium py-2 px-3 transition-colors"
                >
                  {child.name}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    );
  }

  // Standard Link without Subcategories
  return (
    <li>
      <Link
        href={`/category/${item.slug || item.id}`}
        className="text-sm font-medium text-gray-700 hover:text-primary transition-colors block py-1"
      >
        {item.name}
      </Link>
    </li>
  );
}