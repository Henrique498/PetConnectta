import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, User, Accessibility, Building2 } from "lucide-react";
import { normalizeImageSrc } from "@/lib/utils";
import type { Dog } from "@/types";

interface DogCardProps {
  dog: Dog;
  onShowDetails?: (dog: Dog) => void;
  onShowContact?: (dog: Dog) => void;
}

export function DogCard({ dog, onShowDetails, onShowContact }: DogCardProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useAuth();
  const [imageError, setImageError] = useState(false);

  const favorite = isFavorite(dog.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(dog.id);
    } else {
      addToFavorites(dog.id);
    }
  };

  const getSizeLabel = (size: string) => {
    const labels: Record<string, string> = {
      pequeno: "Pequeno",
      medio: "Médio",
      grande: "Grande",
    };
    return labels[size] || size;
  };

  return (
    <Card
      className="overflow-hidden hover-lift card-glow cursor-pointer group"
      onClick={() => onShowDetails?.(dog)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={
            imageError
              ? "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400"
              : normalizeImageSrc(dog.image)
          }
          alt={dog.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={() => setImageError(true)}
        />

        {/* Favorite button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 dark:bg-card/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
        >
          <Heart
            className={`w-5 h-5 ${favorite ? "fill-petred text-petred" : "text-muted-foreground"}`}
          />
        </button>

        {/* Disability badge */}
        {dog.hasDisability && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-petblue text-white border-0">
              <Accessibility className="w-3 h-3 mr-1" />
              Especial
            </Badge>
          </div>
        )}

        {/* Gender badge - bottom right */}
        <div className="absolute bottom-3 right-3 z-10">
          <Badge
            className={`border-0 ${dog.gender === "macho" ? "bg-petblue text-white" : "bg-petpink text-white"}`}
          >
            {dog.gender === "macho" ? "Macho" : "Fêmea"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold">{dog.name}</h3>
          <span className="text-sm text-muted-foreground">
            {dog.age} {dog.ageUnit}
          </span>
        </div>

        <div className="space-y-1.5 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-petred" />
            <span>
              {dog.city}, {dog.state}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-petblue" />
            <span className="truncate">{dog.ongName}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-petorange" />
            <span>{getSizeLabel(dog.size)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onShowDetails?.(dog);
            }}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            Conhecer
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onShowContact?.(dog);
            }}
            size="sm"
            className="flex-1 bg-gradient-to-r from-petpink to-petorange hover:opacity-90 text-white"
          >
            Quero Adotar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
