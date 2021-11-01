import Link from "next/link";

export default function Category(props) {
  const {
    name = "Language",
    categories = ["English", "Italin", "Japanse"],
    id = "0",
  } = props;
  return (
    <div className="w-full justify-center text-lg">
      <ul>
        <p>{name}</p>
        {categories.map((category) => (
          <li key={id} className="p-4 text-gray-500">
            <Link href="/">
              <a className="hover:underline">{category}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
