"use server";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    // connect to the db
    connectToDB();
    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    // store the data in mongodb database
  } catch (error: any) {
    throw new Error(`Failed to create/update product ${error.message}`);
  }
}
