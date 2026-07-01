import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard1 from "./Productcard/Dresscard";
import Jackets from "./Productcard/jacketcard";
import Sheos from "./Productcard/Babydresscard";
import BabyDress from "./Productcard/Babydresscard";

// Clean, reusable configuration array for our tabs
const TAB_ITEMS = [
  { value: "overview", label: "Dress & Jumpsuits", desc: "Latest collection of dresses and jumpsuits.", Component: ProductCard1 },
  { value: "analytics", label: "Jackets & Blazer", desc: "Latest collection of jackets and blazers.", Component: Jackets },
  { value: "reports", label: "Baby Dress", desc: "Baby Dress with Nice Collections.", Component: BabyDress },
];

export function TabsDemo() {
  return (
    <section id="top" className="container mx-auto px-6 md:px-20">
      {/* HEADER SECTION */}
      <div className="text-center pt-20">
        <span className="uppercase tracking-[5px] text-primary font-semibold">Trending</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-4">Trending Products</h1>
        <div className="flex justify-center mt-6">
          <div className="border-t-4 border-primary w-60"></div>
        </div>
      </div>

      {/* TABS CONTROLLER */}
      <div className="w-full flex justify-center py-10  ">
        <Tabs defaultValue="overview" className="w-full">
          
          {/* NAVIGATION LIST */}
          <TabsList
            variant="line"
            className="flex w-full overflow-x-auto no-scrollbar sm:overflow-visible justify-start sm:justify-center gap-3 sm:gap-6 pb-2"
          >
            {TAB_ITEMS.map((tab) => (
              <TabsTrigger key={tab.value} className="whitespace-nowrap text-sm sm:text-base" value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* DYNAMIC CONTENT PANELS */}
          {TAB_ITEMS.map(({ value, label, desc, Component }) => (
            <TabsContent key={value} value={value} className="mt-6 rounded-xl border-none sm:border sm:shadow-md bg-white p-4 sm:p-6">
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">{label}</h2>
                <p className="text-sm sm:text-base text-muted-foreground mt-1">{desc}</p>
              </div>
              <Component />
            </TabsContent>
          ))}
          
        </Tabs>
      </div>
    </section>
  );
}