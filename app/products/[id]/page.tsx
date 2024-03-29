import { getProductById, getSimilarProducts } from "@/lib/actions"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types"
import { formatNumber } from "@/lib/utils"
import PriceInfoCard from "@/components/PriceInfoCard"
import ProductCard from "@/components/ProductCard"
import Modal from "@/components/Modal"

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id)

  if (!product) {
    redirect("/")
  }

  const similarProducts = await getSimilarProducts(id)
  return (
    <div className="product-container -mt-16">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image object-contain">
          <Image
            src={product?.image}
            alt={product?.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product?.title}
              </p>
              <Link
                href={product?.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product On Amazon
              </Link>
            </div>
            <div className="flex items-center g-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  height={20}
                  width={20}
                />
                <p className="text-base font-semibold text-[#d46f77]">{100} </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10 ml-2">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  height={20}
                  width={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10 ml-2">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product?.currency}
                {formatNumber(product?.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product?.currency}
                {formatNumber(product?.originalPrice)}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars cursor-pointer">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="star"
                    height={16}
                    width={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product?.stars || "23"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    height={15}
                    width={15}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewsCount || "124"} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span> of
                buyers have recommended this
              </p>
            </div>
          </div>
          {/* PRICE INFO */}
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.lowestPrice
                )}`}
              />
            </div>
          </div>
          {/* MODAL FOR TRACKING */}
          <Modal productId={id} />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col g-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>
          <div className="flex flex-col gap-4 text-justify">
            {product?.description?.split("\n")}
          </div>
        </div>
        {/* BUY NOW BUTTON */}
        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[20px]">
          <Image
            src="/assets/icons/bag.svg"
            alt="check"
            width={22}
            height={22}
          />
          <Link
            href={product?.url}
            target="_blank"
            className="text-base text-white"
          >
            Buy Now
          </Link>
        </button>
      </div>
      {/* SIMILAR RECOMMENDARIONS */}
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-12 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap items-center justify-center gap-10 mt-7 w-full">
            {similarProducts.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
