import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) return;

  // Bright Data Proxy Configuration

  const username = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const session_id = (1000000 * Math.random()) | 0;

  const options = {
    auth: { username: `${username}-session-${session_id}`, password },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };

  try {
    // actual fetching
    const response = await axios.get(url, options);
    const $ = cheerio.load(response.data);

    // extracting the product title
    const title = $("#productTitle").text().trim();

    // extracting current price
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    // extracting original price
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    // checking for out of stock
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";

    // extracting the product image
    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imageUrls = Object.keys(JSON.parse(images));

    // extracting the currency
    const currency = extractCurrency($(".a-price-symbol"));

    // extracting the discount rate- replacing everything that is not a "%"
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");

    // extracing the description
    const description = extractDescription($);

    // construct data object with scraped information
    const data = {
      url,
      title,
      description,
      currency: currency || "₹",
      image: imageUrls[0] || imageUrls[1] || imageUrls[2] || imageUrls[3],
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      isOutOfStock: outOfStock,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };

    //  returning the scraped data
    return data;
  } catch (error: any) {
    throw new Error(`Failed to scrape product ${error.message}`);
  }
}
