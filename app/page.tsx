// import WorldMap from "./components/Map";
import CountryMap from "./components/Test";


export default function Home() {
  return (
   <div className=" h-screen ">
    
    {/* <WorldMap/> */}
    <div className="mt-[40px]">

    <h1 className="text-5xl text-center uppercase mb-8">Interactive Country Map</h1>

    <CountryMap/>
    </div>
   </div>
  );
}
