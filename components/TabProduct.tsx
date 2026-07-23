import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard1 from "./Productcard/Dresscard";
import Jackets from "./Productcard/jacketcard";
import BabyDress from "./Productcard/Babydresscard";

// Clean, reusable configuration array for our tabs
const TAB_ITEMS = [
  { value: "overview", label: "Dress & Jumpsuits", desc: "Latest collection of dresses and jumpsuits.", Component: ProductCard1 },
  { value: "analytics", label: "Jackets & Blazer", desc: "Latest collection of jackets and blazers.", Component: Jackets },
  { value: "reports", label: "Baby Dress", desc: "Baby Dress with Nice Collections.", Component: BabyDress },
];

export function TabsDemo() {
  return (
<section id="top" className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
  {/* HEADER SECTION */}
  <div className="text-center pt-2 md:pt-16 lg:pt-20">
    <span className="uppercase tracking-[4px] md:tracking-[5px] text-primary text-xs sm:text-sm font-semibold">
      Trending
    </span>

    <h1 className="mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
      Trending Products
    </h1>

    <div className="flex justify-center mt-4 md:mt-6">
      <div className="w-28 sm:w-40 md:w-52 lg:w-60 border-t-4 border-primary rounded-full" />
    </div>
  </div>

  {/* TABS */}
  <div className="py-6 md:py-10">
    <Tabs defaultValue="overview" className="w-full">

      {/* TAB LIST */}
      <div className="overflow-x-auto no-scrollbar">
        <TabsList
          variant="line"
          className="inline-flex min-w-max sm:w-full justify-start sm:justify-center gap-2 sm:gap-4 lg:gap-6"
        >
          {TAB_ITEMS.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="whitespace-nowrap px-3 py-2 text-sm sm:text-base"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {/* TAB CONTENT */}
      {TAB_ITEMS.map(({ value, label, desc, Component }) => (
        <TabsContent
          key={value}
          value={value}
          className="mt-4 md:mt-6 rounded-xl bg-background p-4 sm:p-6 lg:p-8 border sm:border shadow-none sm:shadow-md"
        >
          <div className="mb-5">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-text-primary">
              {label}
            </h2>

            <p className="mt-2 text-sm sm:text-base text-ring max-w-3xl">
              {desc}
            </p>
          </div>

          <Component />
        </TabsContent>
      ))}
    </Tabs>
  </div>
</section>
  );
}