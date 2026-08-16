"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { Category } from "@/app/types/category";

interface MenuItemProps {
  item: Category;
  mobile?: boolean;
  onSelect?: () => void;
}

export default function MenuItem({ item, mobile, onSelect }: MenuItemProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const itemRef = useRef<HTMLLIElement>(null);
  
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Mobile Drawer Logic
  if (mobile) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-between px-3 py-2 text-sm font-medium text-ring hover:text-primary transition-colors">
          <Link
            href={`/category/${item.slug || item.id}`}
            onClick={onSelect}
            className="flex-1"
          >
            {item.name}
          </Link>

          {hasChildren && (
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-1 focus:outline-none"
              aria-label="Toggle Submenu"
            >
              <FaChevronDown
                className={`w-3 h-3 text-ring/60 transition-transform duration-200 ${
                  isMobileOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>

        {hasChildren && isMobileOpen && (
          <div className="pl-4 space-y-1 border-l-2 border-ring/10 ml-3">
            {item.children?.map((child) => (
              <MenuItem
                key={child.id}
                item={child}
                mobile
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Handle Desktop Mouse Enter to calculate position
  const handleMouseEnter = () => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom,
        left: rect.left,
      });
    }
  };

  return (
    <li
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      className="relative group/menu flex items-center h-full"
    >
      <Link
        href={`/category/${item.slug || item.id}`}
        className="flex items-center gap-1.5 py-2  text-sm font-medium text-ring hover:text-primary transition-colors whitespace-nowrap rounded-md hover:bg-gray-50"
      >
        <span>{item.name}</span>
        {hasChildren && (
          <FaChevronDown className="w-2.5 h-2.5 text-ring/50 group-hover/menu:rotate-180 transition-transform duration-200 shrink-0" />
        )}
      </Link>

      {/* 1st Level Dropdown with Fixed Position */}
      {hasChildren && dropdownPos && (
        <div
          style={{
            position: "fixed",
            top: `${dropdownPos.top}px`,
            left: `${dropdownPos.left}px`,
          }}
          className="hidden group-hover/menu:block pt-1 z-[9999]"
        >
          <ul className="w-56 bg-background border border-ring/10 rounded-lg shadow-xl py-2 text-left">
            {item.children?.map((child) => {
              const hasSubChildren = Boolean(
                child.children && child.children.length > 0
              );

              return (
                <li
                  key={child.id}
                  className="relative group/nested px-4 py-2 hover:bg-ring/10 flex items-center justify-between text-sm text-ring hover:text-primary cursor-pointer transition-colors"
                >
                  <Link
                    href={`/category/${child.slug || child.id}`}
                    className="w-full flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{child.name}</span>
                    {hasSubChildren && (
                      <FaChevronRight className="w-2.5 h-2.5 text-ring/50 shrink-0" />
                    )}
                  </Link>

                  {/* 2nd Level Nested Submenu */}
                  {hasSubChildren && (
                    <div className="absolute top-0 left-full hidden group-hover/nested:block pl-1 z-[9999]">
                      <ul className="w-56 bg-backround border border-ring/10 rounded-lg shadow-xl py-2 text-left">
                        {child.children?.map((nestedChild) => (
                          <li key={nestedChild.id}>
                            <Link
                              href={`/category/${
                                nestedChild.slug || nestedChild.id
                              }`}
                              className="block px-4 py-2 text-sm text-ring hover:bg-ring/10 hover:text-primary transition-colors truncate"
                            >
                              {nestedChild.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}