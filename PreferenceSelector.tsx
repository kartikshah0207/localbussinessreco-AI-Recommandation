import { Select } from "../ui/select";

interface PreferenceSelectorProps {
  rating: string;
  distance: string;
  price: string;
  onRatingChange: (value: string) => void;
  onDistanceChange: (value: string) => void;
  onPriceChange: (value: string) => void;
}

export function PreferenceSelector({
  rating,
  distance,
  price,
  onRatingChange,
  onDistanceChange,
  onPriceChange
}: PreferenceSelectorProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Preferred rating
        </p>
        <Select
          value={rating}
          onChange={(event) => onRatingChange(event.target.value)}
        >
          <option value="">No preference</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Maximum distance
        </p>
        <Select
          value={distance}
          onChange={(event) => onDistanceChange(event.target.value)}
        >
          <option value="">No preference</option>
          <option value="1">1 km</option>
          <option value="3">3 km</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Price range
        </p>
        <Select
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
        >
          <option value="">No preference</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </Select>
      </div>
    </div>
  );
}

