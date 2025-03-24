import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface Subcategory {
  name: string;
  href: string;
}

interface Category {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  subcategories?: Subcategory[];
}

interface NavigationMenuProps {
  categories: Category[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ categories }) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="bg-white">
        {categories.map((category) => (
          <div key={category.name} className="group relative">
            {/* Link cho danh mục chính */}
            <a
              href={category.href || "#"}
              className="flex justify-between items-center p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                {category.icon && <span>{category.icon}</span>}
                <span>{category.name}</span>
              </div>
              {category.subcategories && category.subcategories.length > 0 && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-4 h-4 text-gray-500"
                />
              )}
            </a>

            {/* Submenu */}
            {category.subcategories && category.subcategories.length > 0 && (
              <div className="absolute top-0 left-full bg-white shadow-lg w-48 hidden group-hover:block">
                {category.subcategories.map((subcategory) => (
                  <a
                    key={subcategory.name}
                    href={subcategory.href}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer block"
                  >
                    {subcategory.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu;
