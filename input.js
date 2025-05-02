export function Input({ placeholder, value, onChange }) {
  return (
    <input
      className="p-2 border border-gray-300 rounded w-full"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
