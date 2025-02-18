import BrowsingHistoryList from "@/components/shared/browsing-history-list";
// import { HomeCard } from "@/components/shared/home/home-card";
import { HomeCarousel } from "@/components/shared/home/home-carousel";
import ProductSlider from "@/components/shared/product/product-slider";
import { Card, CardContent } from "@/components/ui/card";

import { getProductsByTag, } from "@/lib/actions/product.actions";
import data from "@/lib/data";
// import { toSlug } from "@/lib/utils";

export default async function HomePage() {

  // const categories = (await getAllCategories()).slice(0, 4)
  // const newArrivals = await getProductsForCard({
  //   tag: 'new-arrival',
  //   limit: 1,
  // })
  // const featureds = await getProductsForCard({
  //   tag: 'featured',
  //   limit: 1,
  // })
  // const bestSellers = await getProductsForCard({
  //   tag: 'best-seller',
  //   limit: 1,
  // })
  // const cards = [
  //   {
  //     title: 'Categories to explore',
  //     link: {
  //       text: 'See More',
  //       href: '/search',
  //     },
  //     items: categories.map((category) => ({
  //       name: category,
  //       image: `/images/p16-2.jpg`,
  //       href: `/search?category=${category}`,
  //     })),
  //   },
  //   {
  //     title: 'New Arrivals',
  //     items: newArrivals,
  //     link: {
  //       text: 'View All',
  //       href: '/search?tag=new-arrival',
  //     },
  //   },
  //   {
  //     title: 'Discover Best Sellers',
  //     items: bestSellers,
  //     link: {
  //       text: 'All',
  //       href: '/search?tag=new-arrival',
  //     },
  //   },
  //   {
  //     title: 'Featured Products',
  //     items: featureds,
  //     link: {
  //       text: 'Shop Now',
  //       href: '/search?tag=new-arrival',
  //     },
  //   },
  // ]

  const todaysDeals = await getProductsByTag({ tag: 'promo-hari-ini' })
  const bestSellingProducts = await getProductsByTag({ tag: 'produk-terlaris' })

  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        {/* <HomeCard cards={cards} /> */}
        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider title={"Promo Hari Ini"} products={todaysDeals} />
          </CardContent>
        </Card>

        <Card className='w-full rounded-none'>
          <CardContent className='p-4 items-center gap-3'>
            <ProductSlider
              title='Produk Terlaris'
              products={bestSellingProducts}
              hideDetails
            />
          </CardContent>
        </Card>
      </div>
      <div className='p-4 bg-background'>
        <BrowsingHistoryList />
      </div>
    </>
  )
}
