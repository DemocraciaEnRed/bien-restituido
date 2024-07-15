import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

const CategoryList = ({ categories }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías existentes de bienes </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories &&
              categories.map((category) => (
                <TableRow key={category._id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="flex justify-end gap-6">
                    <Link href={`/admin/categoria/${category.slug}`}>
                      <Eye />
                    </Link>
                    <Link href={`/admin/categoria/${category.slug}/editar`}>
                      <Pencil />
                    </Link>
                    <Link href="">
                      <Trash />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
