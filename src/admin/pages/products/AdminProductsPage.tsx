import { Link, useSearchParams } from "react-router"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../../components/ui/table"
import { AdminTitle } from "../../components/AdminTitle"
import { CustomPagination } from "../../../components/custom/CustomPagination"
import { Button } from "../../../components/ui/button"
import { PencilIcon, PlusIcon } from "lucide-react"
import { useProducts } from "../../../shop/hooks/useProducts"
import { formatCurrency } from "../../../lib/currency-formatter"


export const AdminProductsPage = () => {

  const { data } = useProducts();
  const products = data?.products || [];
  const totalPages = data?.pages || 1;
  return (
    <>

      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver informacion de tus productos"
        />

        <div className="flex justify-end mb-10 gap-4"  >
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>

        </div>

      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-20 p-4">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            products.map(product => (
              <TableRow key={product.id}>
                <TableCell className="font-medium whitespace-normal text-sm p-4">{product.id}</TableCell>
                <TableCell>
                  <img
                    src={product.images[0]}
                    alt="Producto"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="w-1 text-blue-500 font-semibold">
                  <Link to={`/admin/products/${product.id}`}>
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.tags}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sizes.map(size => size + ' ')}</TableCell>
                <TableCell>
                  <Link to={`/admin/products/${product.id}`} >
                    <PencilIcon className="w-4 h-4 text-blue-500" />
                  </Link>
                </TableCell>
              </TableRow>

            ))
          }
        </TableBody>
      </Table>

      <CustomPagination
        totalPages={totalPages}
      />
    </>
  )
}
