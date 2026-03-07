import { WishlistAmazon } from "@/entities/WishlistAmazon";
import { getDatabaseConnection } from "@/lib/db";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const today = new Date();

    const db = await getDatabaseConnection();
    const wishlistRepository = db.getRepository(WishlistAmazon);
    const minPricesPerBook = await wishlistRepository
      .createQueryBuilder("wishlist")
      .select("wishlist.title", "title")
      .addSelect("MIN(wishlist.price)", "minPrice")
      .groupBy("wishlist.title")
      .orderBy("minPrice", "ASC")
      .where("wishlist.searchDate LIKE :date", { date: `${format(today, "yyyy-MM-dd")}%` })
      .andWhere("wishlist.price <> ''")
      .getRawMany();

    const minPricesPerBookOrdered = minPricesPerBook.sort((a, b) => {
      const parsePrice = (val: string) => {
        const cleanVal = val.replace(/[^\d,.-]/g, '').replace(',', '.');
        return parseFloat(cleanVal) || 0;
      };

      return parsePrice(a.minPrice) - parsePrice(b.minPrice);
    }).slice(0, 9);

    const list = minPricesPerBookOrdered.map(item => ({
      name: item.title,
      price: item.minPrice,
      store: "Amazon",
      alert: true,
    }));
    
    return NextResponse.json({ message: "Products data retrieved successfully", data: list }, { status: 200 })
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json({ error: "Failed to retrieve products data" }, { status: 500 });
  }
}