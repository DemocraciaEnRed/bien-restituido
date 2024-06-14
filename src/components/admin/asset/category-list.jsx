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

const CategoryList = ({ assetCategories }) => {
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
            {assetCategories &&
              assetCategories.map((type) => (
                <TableRow key={type._id}>
                  <TableCell className="font-medium">{type.name}</TableCell>
                  <TableCell className="text-right">
                    <Link
                      href=""
                      className={buttonVariants({
                        variant: "outline",
                        className: "mx-1",
                      })}
                    >
                      Ver
                    </Link>
                    <Link
                      href=""
                      className={buttonVariants({
                        variant: "outline",
                        className: "mx-1",
                      })}
                    >
                      Editar
                    </Link>
                    <Link
                      href=""
                      className={buttonVariants({
                        variant: "outline",
                        className: "mx-1",
                      })}
                    >
                      Borrar
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
