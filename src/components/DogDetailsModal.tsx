import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Accessibility, Syringe, MapPin } from 'lucide-react';
import type { Dog } from '@/types';

interface DogDetailsModalProps {
  dog: Dog | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdoptClick?: () => void;
}

export function DogDetailsModal({ dog, isOpen, onOpenChange, onAdoptClick }: DogDetailsModalProps) {
  if (!dog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {dog.name}
            {dog.hasDisability && (
              <Badge className="bg-petblue text-white">
                <Accessibility className="w-3 h-3 mr-1" />
                Especial
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {dog.ongName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <img
            src={dog.image}
            alt={dog.name}
            className="w-full aspect-video object-cover rounded-xl"
          />

          <p className="text-muted-foreground">{dog.description}</p>

          {dog.hasDisability && dog.disabilityType && (
            <div className="p-4 bg-petblue/10 rounded-xl border border-petblue/30">
              <p className="font-semibold text-petblue flex items-center gap-2">
                <Accessibility className="w-5 h-5" />
                Necessidade especial
              </p>
              <p className="text-sm mt-1">{dog.disabilityType}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Calendar className="w-5 h-5 text-petblue" />
              <div>
                <p className="text-xs text-muted-foreground">Idade</p>
                <p className="font-medium">{dog.age} {dog.ageUnit}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <User className={`w-5 h-5 ${dog.gender === 'macho' ? 'text-petblue' : 'text-petpink'}`} />
              <div>
                <p className="text-xs text-muted-foreground">Sexo</p>
                <p className="font-medium">{dog.gender === 'macho' ? 'Macho' : 'Fêmea'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <MapPin className="w-5 h-5 text-petred" />
              <div>
                <p className="text-xs text-muted-foreground">Local</p>
                <p className="font-medium">{dog.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Syringe className="w-5 h-5 text-petgreen" />
              <div>
                <p className="text-xs text-muted-foreground">Vacinado</p>
                <p className="font-medium">{dog.isVaccinated ? 'Sim' : 'Não'}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                onAdoptClick?.();
                onOpenChange(false);
              }}
              className="flex-1 bg-gradient-to-r from-petpink to-petorange hover:opacity-90 text-white"
            >
              Quero Adotar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
