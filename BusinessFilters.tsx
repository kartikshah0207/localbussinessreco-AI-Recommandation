import { Input } from "../ui/input";
import { Select } from "../ui/select";

interface BusinessFiltersProps {
  category: string;
  rating: string;
  distance: string;
  search: string;
  onCategoryChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onDistanceChange: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

export function BusinessFilters({
  category,
  rating,
  distance,
  search,
  onCategoryChange,
  onRatingChange,
  onDistanceChange,
  onSearchChange
}: BusinessFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Category
          </label>
          <Select
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="">All categories</option>
            <option value="cafe">Cafes</option>
            <option value="restaurant">Restaurants</option>
            <option value="salon">Salons</option>
            <option value="other">Other</option>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Minimum rating
          </label>
          <Select
            value={rating}
            onChange={(event) => onRatingChange(event.target.value)}
          >
            <option value="">Any</option>
            <option value="3">3.0+</option>
            <option value="4">4.0+</option>
            <option value="4.5">4.5+</option>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Max distance (km)
          </label>
          <Input
            type="number"
            min={0}
            placeholder="e.g. 5"
            value={distance}
            onChange={(event) => onDistanceChange(event.target.value)}
          />
        </div>
      </div>
      <div className="w-full md:w-64 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground">
          Search
        </label>
        <Input
          placeholder="Search by name or keyword"
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>
    </div>
  );
}

