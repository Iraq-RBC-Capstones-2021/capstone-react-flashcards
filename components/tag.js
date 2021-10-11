export default function Tag({ name = "placeholder" }) {
  return (
    <span className="border rounded-2xl  p-1 text-xs md:text-sm  cursor-pointer">
      {name}
    </span>
  );
}
