import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';

interface TopicSelectorProps {
  selectedTopics: string[];
  availableTopics: string[];
  onAddTopic: (topic: string) => void;
  onRemoveTopic: (topic: string) => void;
}

export function TopicSelector({ selectedTopics, availableTopics, onAddTopic, onRemoveTopic }: TopicSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredTopics = availableTopics.filter(topic => 
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="w-full relative">
      {/* Selected Topics Display */}
      <div 
        className="min-h-[38px] px-2 py-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 flex flex-wrap gap-1 items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTopics.map(topic => (
          <span 
            key={topic} 
            className="bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded-full text-sm flex items-center gap-1 text-gray-800 dark:text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            <X 
              className="w-4 h-4 cursor-pointer hover:text-red-500" 
              onClick={(e) => {
                e.stopPropagation();
                onRemoveTopic(topic);
              }}
            />
          </span>
        ))}
        {selectedTopics.length === 0 && (
          <span className="text-gray-500 dark:text-gray-400">Select topics</span>
        )}
        <ChevronDown className={`w-4 h-4 ml-auto text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Search and Topic List Dropdown */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 border dark:border-gray-600 rounded bg-white dark:bg-gray-700 shadow-lg">
          <div className="p-2 border-b dark:border-gray-600 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            <div className="grid grid-cols-2 gap-1 p-2">
              {filteredTopics.map(topic => (
                <div
                  key={topic}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer"
                  onClick={() => {
                    onAddTopic(topic);
                    setSearchTerm('');
                  }}
                >
                  <div className="w-4 h-4 border dark:border-gray-500 rounded flex items-center justify-center">
                    {selectedTopics.includes(topic) && (
                      <div className="w-2 h-2 bg-blue-500 rounded-sm" />
                    )}
                  </div>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {topic.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 