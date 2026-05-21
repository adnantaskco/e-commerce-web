import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import ProductCard1 from "./product1";
import Jackets from "./jacket";
import Sheos from "./product2";

export function TabsDemo() {
  return (
    <section >
        <div className="text-center pt-20">
            <h1 className="text-4xl font-semibold">Trending Products</h1>

            <div className="flex justify-center mt-4">
                <div className="border-t-4 border-primary w-60"></div>
            </div>
            </div>

        <div className="w-full flex justify-center px-4 sm:px-6 py-10">
            <Tabs defaultValue="overview" className="w-full max-w-8xl">

        {/* ✅ Tabs Header (Responsive scroll on mobile) */}
        <TabsList
          variant="line"
          className="flex w-full overflow-x-auto sm:overflow-visible justify-start sm:justify-center gap-3 sm:gap-6 px-2 sm:px-0"
        >
          <TabsTrigger className="whitespace-nowrap text-sm sm:text-base" value="overview">
            Dress & Jumpsuits
          </TabsTrigger>

          <TabsTrigger className="whitespace-nowrap text-sm sm:text-base" value="analytics">
            Jackets & Blazer
          </TabsTrigger>

          <TabsTrigger className="whitespace-nowrap text-sm sm:text-base" value="reports">
            Shoes & Accessories
          </TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview">
          <Card className="border-none shadow-none sm:shadow-md">
            <CardHeader className="px-2 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">
                Dress & Jumpsuits
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Latest collection of dresses and jumpsuits.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-2 sm:px-6">
              <ProductCard1 />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics">
          <Card className="border-none shadow-none sm:shadow-md">
            <CardHeader className="px-2 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">
                Jackets & Blazer
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Latest collection of jackets and blazers.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-2 sm:px-6">
              <Jackets />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports */}
        <TabsContent value="reports">
          <Card className="border-none shadow-none sm:shadow-md">
            <CardHeader className="px-2 sm:px-6">
              <CardTitle className="text-lg sm:text-xl">
                Shoes & Accessories
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Trendy shoes and fashion accessories.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-2 sm:px-6 text-sm text-muted-foreground">
              Explore our latest footwear collection.
              <Sheos></Sheos>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

        </div>
      
      
    </section>
  );
}