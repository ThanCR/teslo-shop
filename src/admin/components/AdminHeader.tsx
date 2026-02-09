import React, { useRef, type KeyboardEvent } from 'react';
import { Search, Bell, MessageSquare, Settings } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { Input } from '../../components/ui/input';

const AdminHeader: React.FC = () => {


  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const queryValue = inputRef.current?.value;
      const newSearchParams = new URLSearchParams(); // lets create a new URL searchparams to clear all URL parameters
      if (!queryValue) {
        newSearchParams.delete('query');
      } else {
        newSearchParams.set('query', inputRef.current?.value || '');
      }
      setSearchParams(newSearchParams);
    }
  }


  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 h-18">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input placeholder="Buscar productos..." className="pl-9 w-64 h-9" ref={inputRef}
              defaultValue={searchQuery}
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MessageSquare size={20} />
          </button>

          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} />
          </button>

          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm cursor-pointer hover:shadow-lg transition-shadow">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;