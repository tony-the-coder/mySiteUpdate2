// reactland/src/components/ui/card-hover-effect-demo.tsx
import { HoverEffect } from "@/components/ui/card-hover-effect";

interface CardItem {
  title: string;
  description: string;
  link: string;
}

export default function CardHoverEffectDemo({ items }: { items: CardItem[] }) {
  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={items} />
    </div>
  );
}