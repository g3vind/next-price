import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { HiTrendingUp } from "react-icons/hi"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"

const Home = async () => {
  const allProducts = await getAllProducts()

  return (
    <>
      <section className="px-6 md:px-20 py-4">
        <div className="flex max-xl:flex-col  gap-16">
          <div className="flex flex-col -mt-14 justify-center">
            <p className="small-text">
              Smart Shopping Starts Here:
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Unleash the Power of
              <span className="text-primary"> NextPrice</span>
            </h1>

            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>
      {/* TRENDING SECTION */}
      <section className="trending-section">
        <h2 className="section-text flex items-center gap-2">
          Trending Items
          <HiTrendingUp size={28} />
        </h2>
        {/* TRENDING ITEMS */}
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-12">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
