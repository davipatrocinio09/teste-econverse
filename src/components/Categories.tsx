import { Icon, type IconName } from "./Icon";

const categories: { name: string; icon: IconName }[] = [
  { name: "Tecnologia", icon: "technology" },
  { name: "Supermercado", icon: "market" },
  { name: "Bebidas", icon: "bottle" },
  { name: "Ferramentas", icon: "tools" },
  { name: "Saúde", icon: "health" },
  { name: "Esportes e Fitness", icon: "fitness" },
  { name: "Moda", icon: "fashion" },
];

export function Categories({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <nav
      id="categorias"
      className="categories container"
      aria-label="Categorias"
    >
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onSelect(category.name)}
          className={selected === category.name ? "selected" : ""}
          aria-pressed={selected === category.name}
        >
          <span>
            <Icon name={category.icon} size={58} />
          </span>
          {category.name}
        </button>
      ))}
    </nav>
  );
}
