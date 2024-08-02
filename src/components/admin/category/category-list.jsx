"use client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  deleteCategory,
  deleteCategoryById,
} from "@/lib/server-actions/admin/asset-actions/category";
import { Eye, Pencil, Trash } from "lucide-react";
import Link from "next/link";

const CategoryList = ({ categories }) => {
  const { toast } = useToast();
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
                    <Link
                      href={`/admin/categorias/${category.slug}`}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      <Eye />
                    </Link>
                    <Link
                      href={`/admin/categorias/${category.slug}/editar`}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      <Pencil />
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() =>
                        toast({
                          description: "Confirmar para eliminar la categoria",
                          variant: "destructive",
                          action: (
                            <ToastAction
                              onClick={() => {
                                deleteCategoryById(category._id);
                              }}
                              altText="Confirmar"
                            >
                              Confirmar
                            </ToastAction>
                          ),
                        })
                      }
                    >
                      <Trash />
                    </Button>
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
