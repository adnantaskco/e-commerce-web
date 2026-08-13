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
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";

interface MenuItemProps {
  item: Category;
  mobile?: boolean;
  onSelect?: () => void;
}

export default function MenuItem({ item, mobile = false, onSelect }: MenuItemProps) {
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Mobile Drawer Navigation Item
  if (mobile) {
    return (
      <div className="w-full border-b border-gray-100">
        <div className="flex items-center justify-between px-5 py-3 hover:bg-gray-50/80 transition-colors">
          <Link
            href={`/category/${item.slug || item.id}`}
            onClick={onSelect}
            className="text-sm font-normal text-gray-700 hover:text-sky-500 transition-colors flex-1"
          >
            {item.name}
          </Link>
          {hasChildren && (
            <button
              onClick={() => setMobileSubOpen(!mobileSubOpen)}
              className="p-1 text-gray-400 hover:text-sky-500 transition-transform duration-200"
              aria-label="Toggle subcategories"
            >
              <FaChevronRight
                className={`h-3 w-3 transition-transform duration-200 ${
                  mobileSubOpen ? "rotate-90 text-sky-500" : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Mobile Accordion Subcategories */}
        {hasChildren && mobileSubOpen && (
          <ul className="bg-gray-50/50 border-t border-gray-100 pl-8 pr-5 py-2 space-y-1">
            {item.children?.map((child) => (
              <li key={child.id}>
                <Link
                  href={`/category/${child.slug || child.id}`}
                  onClick={onSelect}
                  className="block text-xs font-normal text-gray-600 hover:text-sky-500 py-1.5 transition-colors"
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
          <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors outline-none cursor-pointer py-1">
            <span>{item.name}</span>
            <FaChevronDown className="h-2.5 w-2.5 text-gray-400 group-hover:text-sky-500 transition-transform duration-200" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-xl border border-gray-100 p-1.5 z-50"
          >
            {item.children?.map((child) => (
              <DropdownMenuItem
                key={child.id}
                asChild
                className="rounded-lg cursor-pointer focus:bg-sky-50 focus:text-sky-500"
              >
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
        className="text-sm font-medium text-gray-700 hover:text-sky-500 transition-colors block py-1"
      >
        {item.name}
      </Link>
    </li>
  );
}