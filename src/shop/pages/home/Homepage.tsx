import { CustomPagination } from "../../../components/custom/CustomPagination"
import { CustomJumbotron } from "../../components/CustomJumbotron"
import { ProductsGrid } from "../../components/ProductsGrid"
import { useProducts } from "../../hooks/useProducts"

export const Homepage = () => {

  const { data } = useProducts();
  const products = data?.products || [];

  return (
    <>
      <CustomJumbotron title='Todos los productos' />
      <ProductsGrid products={products} />
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  )
}
