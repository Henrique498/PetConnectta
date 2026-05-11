import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Phone, Mail } from 'lucide-react';
import type { Dog } from '@/types';

interface DogContactModalProps {
  dog: Dog | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DogContactModal({ dog, isOpen, onOpenChange }: DogContactModalProps) {
  if (!dog) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Quero adotar {dog.name}!</DialogTitle>
          <DialogDescription>
            Entre em contato com a {dog.ongName} para iniciar o processo de adoção.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-xl">
            <p className="font-semibold mb-2">Próximos passos:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Entre em contato com a ONG</li>
              <li>Agende uma visita para conhecer o cachorro</li>
              <li>Preencha o formulário de adoção</li>
              <li>Aguarde a aprovação</li>
              <li>Leve seu novo amigo para casa!</li>
            </ol>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:+5511987654321`}
              className="flex items-center gap-3 p-4 bg-petgreen/10 rounded-xl hover:bg-petgreen/20 transition-colors"
            >
              <Phone className="w-6 h-6 text-petgreen" />
              <div>
                <p className="font-semibold">Ligar para ONG</p>
                <p className="text-sm text-muted-foreground">{dog.ongName}</p>
              </div>
            </a>

            <a
              href={`mailto:contato@example.com?subject=Interesse em adotar ${dog.name}`}
              className="flex items-center gap-3 p-4 bg-petblue/10 rounded-xl hover:bg-petblue/20 transition-colors"
            >
              <Mail className="w-6 h-6 text-petblue" />
              <div>
                <p className="font-semibold">Enviar email</p>
                <p className="text-sm text-muted-foreground">Sobre {dog.name}</p>
              </div>
            </a>
          </div>

          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
