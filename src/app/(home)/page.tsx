import Container from '@/components/Container';
import getProducts, {ProductsParams} from '../actions/getProducts'
import EmptyState from '@/components/EmptyState';
import ProductCard from '@/components/products/ProductCard';
import getCurrentUser from '../actions/getCurrentUser';
import FloatingButtton from '@/components/FloatingButtton';
import Categories from '@/components/categories/Categories';
import Pagination from '@/components/Pagination';
import { PRODUCTS_PER_PAGE } from '@/constants';
import { IoAdd } from "react-icons/io5";
import Banner from '../../components/Banner'

interface HomeProps{
  searchParams: ProductsParams
}

export default async function Home({searchParams}: HomeProps) {

  const page = searchParams?.page;
  //URL에서 가져오는 쿼리매개변수(?키=쌍값)은 문자열!!!
  //그래서 page의 typeof가 string
  console.log('page =====> ', page)
  //URL에서 가져오는 값은 문자열이기 때문에 page의 타입이 문자열인지 확인 후
  //Number(page)를 통해 숫자로 변환
  const pageNum = typeof page === 'string' ? Number(page) : 1;
  console.log('pageNum => ', pageNum);

  const products = await getProducts(searchParams);
  console.log('products',products);
  
  const currentUser = await getCurrentUser();

  return (
      <Container>
        <Banner/>
          <Categories />
          {products?.data.length === 0 
            ? <EmptyState showReset/>
            : 
              <>
                <div className='grid grid-cols-1 gap-8 pt-12 mb-8 sm:gird-cols-2 md:grid-cols-3
                  lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
                  {products.data.map((product) => (
                    <ProductCard
                      currentUser={currentUser}
                      key={product.id}
                      data={product}
                    />
                  ))}
                </div>
              </>
            }
            <Pagination page={pageNum} totalItems={products.totalItems} perPage={PRODUCTS_PER_PAGE}/>
            <FloatingButtton href="/products/upload"><IoAdd size={25}/> 글쓰기</FloatingButtton>
      </Container>
  )
}
