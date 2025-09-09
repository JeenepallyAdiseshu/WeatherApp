
import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, onLocationRequest, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="glass-card animate-fade-in mb-8 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="glass-input w-full pr-12"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        <button
          type="button"
          onClick={onLocationRequest}
          disabled={isLoading}
          className="glass rounded-2xl px-4 py-4 text-white/70 hover:text-white transition-colors disabled:opacity-50"
          title="Use current location"
        >
          <MapPin className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
