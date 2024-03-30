function NavTab({
  label,
  isSelected,
  onSelect,
}: {
  label: string;
  isSelected?: boolean;
  onSelect: (name: string) => void;
}) {
  return (
    <a
      href="#"
      className={`p-4 mr-4 hover:text-green-600 font-semibold dark:text-white dark:hover:text-green-600 ${
        isSelected && "text-green-600"
      }`}
      onClick={() => onSelect(label)}
    >
      {label}
    </a>
  );
}

export default NavTab;
