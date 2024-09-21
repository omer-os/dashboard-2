import { useToast } from "~/components/ui/use-toast";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Card } from "../ui/card";

function CatalogCard({
  card,
}: {
  card: {
    name: string;
    description: string;
    image: string;
    itemCount: number;
  };
}) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: action,
      description: `Performed ${action} on ${card.name}`,
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="hover:bg-accent/20 flex items-center gap-4 p-4 transition-colors">
          <div className="bg-muted rounded-lg p-1">
            <img
              src={card.image}
              alt={card.name}
              className="h-16 w-16 rounded-md object-cover"
            />
          </div>
          <div className="flex flex-grow flex-col">
            <div className="text-lg font-semibold">{card.name}</div>
            <div className="text-muted-foreground text-sm">
              {card.description}
            </div>
            <div className="text-primary mt-1 text-xs">
              {card.itemCount} items
            </div>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-40">
        <ContextMenuItem onSelect={() => handleAction("Edit")}>
          Edit
        </ContextMenuItem>
        <ContextMenuItem onSelect={() => handleAction("Duplicate")}>
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem
          onSelect={() => handleAction("Archive")}
          className="text-yellow-500"
        >
          Archive
        </ContextMenuItem>
        <ContextMenuItem
          onSelect={() => handleAction("Delete")}
          className="text-red-500"
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default CatalogCard;
