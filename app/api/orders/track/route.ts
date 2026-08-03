import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("order_number");

  if (!orderNumber) {
    return NextResponse.json({ error: "Order number required" }, { status: 400 });
  }

  // --- Replace with your DB query logic ---
  // const order = await db.order.findUnique({ where: { orderId: orderNumber } });

  // Mock response example:
  const mockOrder = {
    orderId: orderNumber,
    status: "Pending",
    statusTimestamp: "Aug 2, 9:48 AM",
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        qty: 1,
        sku: "1",
        price: 222.00,
        image: "/images/headphones.jpg"
      }
    ],
    subtotal: 222.00,
    deliveryFee: 110.00,
    grandTotal: 332.00,
    totalPaid: 0.00,
    amountDue: 332.00,
    paymentStatus: "UNPAID",
    paymentMethod: "COD",
    customerName: "Md. Sohanur Rahman Adnan",
    shippingAddress: "House 12, Road 4, Sector 7, Uttara, Dhaka",
    phoneNumber: "+8801772005259",
    deliveryProvider: "Pathao Courier"
  };

  return NextResponse.json(mockOrder);
}