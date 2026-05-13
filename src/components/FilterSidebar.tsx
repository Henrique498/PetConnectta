import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Search,
  Heart,
  Building,
  User,
  Navigation,
  MapPinned,
} from "lucide-react";
import { cities, ageRanges, ongs } from "@/data/dogs";
import type { FilterOptions } from "@/types";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  cepInput: string;
  onCepChange: (cep: string) => void;
  onSearchByCep: () => void;
}

const sizeOptions = [
  { value: "all", label: "Todos os portes" },
  { value: "pequeno", label: "Pequeno" },
  { value: "medio", label: "Médio" },
  { value: "grande", label: "Grande" },
];

const genderOptions = [
  { value: "all", label: "Todos os gêneros" },
  { value: "macho", label: "Macho" },
  { value: "femea", label: "Fêmea" },
];

const disabilityOptions = [
  { value: "all", label: "Todos os pets" },
  { value: "yes", label: "Com necessidades especiais" },
  { value: "no", label: "Sem necessidades especiais" },
];

export function FilterSidebar({
  filters,
  onFilterChange,
  cepInput,
  onCepChange,
  onSearchByCep,
}: FilterSidebarProps) {
  const [showCepSearch, setShowCepSearch] = useState(false);

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const selectClassName =
    "bg-white dark:bg-card border h-10 w-full rounded-md px-3 text-sm";

  return (
    <div className="space-y-6">
      {/* CEP Search */}
      <div className="bg-gradient-to-r from-petpink/10 to-petorange/10 rounded-xl p-4 border border-petpink/20">
        <button
          onClick={() => setShowCepSearch(!showCepSearch)}
          className="flex items-center gap-2 w-full text-left"
        >
          <Navigation className="w-5 h-5 text-petpink" />
          <span className="font-medium">Buscar por proximidade</span>
        </button>

        {showCepSearch && (
          <div className="mt-3 space-y-2">
            <Input
              type="text"
              placeholder="Digite seu CEP"
              value={cepInput}
              onChange={(e) => onCepChange(e.target.value)}
              className="h-10"
            />
            <button
              onClick={onSearchByCep}
              disabled={cepInput.length < 8}
              className="w-full py-2 px-4 bg-gradient-to-r from-petpink to-petorange text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MapPinned className="w-4 h-4 inline mr-2" />
              Buscar próximos
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-petpink"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filtros
        </h3>

        <div className="space-y-4">
          {/* City */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-petred" />
              Cidade
            </Label>
            <select
              value={filters.city}
              onChange={(e) => updateFilter("city", e.target.value)}
              className={selectClassName}
            >
              <option value="all">Todas as cidades</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 text-petblue" />
              Idade
            </Label>
            <select
              value={filters.ageRange}
              onChange={(e) => updateFilter("ageRange", e.target.value)}
              className={selectClassName}
            >
              {ageRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Search className="w-4 h-4 text-petgreen" />
              Porte
            </Label>
            <select
              value={filters.size}
              onChange={(e) => updateFilter("size", e.target.value)}
              className={selectClassName}
            >
              {sizeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="w-4 h-4 text-petpink" />
              Gênero
            </Label>
            <select
              value={filters.gender || "all"}
              onChange={(e) => updateFilter("gender", e.target.value)}
              className={selectClassName}
            >
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Disability */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-petorange" />
              Necessidades Especiais
            </Label>
            <select
              value={filters.hasDisability}
              onChange={(e) => updateFilter("hasDisability", e.target.value)}
              className={selectClassName}
            >
              {disabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* ONG */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building className="w-4 h-4 text-petpink" />
              ONG
            </Label>
            <select
              value={filters.ongId}
              onChange={(e) => updateFilter("ongId", e.target.value)}
              className={selectClassName}
            >
              <option value="all">Todas as ONGs</option>
              {ongs.map((ong) => (
                <option key={ong.id} value={ong.id}>
                  {ong.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
