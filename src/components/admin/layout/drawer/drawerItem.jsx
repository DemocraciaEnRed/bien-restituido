import Link from "next/link";

function DrawerItem({ url, text }) {
  return (
    <li>
      <Link
        className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
        href={"/admin/" + url}
      >
        <span className="mx-4 font-medium">{text}</span>
      </Link>
    </li>
  );
}

export default DrawerItem;
