import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomDropdown({ value, options, onChange, placeholder = 'Select...', className = 'w-full' }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div
      className={`relative ${className}`}
      ref={dropdownRef}
    >
      <div
        className="h-[38px] px-3 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 flex items-center justify-between cursor-pointer hover:border-blue-500 dark:hover:border-blue-400"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm text-gray-900 dark:text-gray-100">
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 shadow-lg">
          {options.map(option => (
            <div
              key={option.value}
              className="px-3 py-2 text-sm flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span className="text-gray-900 dark:text-gray-100">{option.label}</span>
              {option.value === value && (
                <Check className="w-4 h-4 text-blue-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 