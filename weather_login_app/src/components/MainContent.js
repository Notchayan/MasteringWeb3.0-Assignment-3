import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

function MainContent({forcastDataList,windSpeed,windDirection,humidity,pressure,visibility}) {
  return (
    <div className="text-gray-150 px-10 flex-grow">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 my-5 gap-10 justify-center">
        <SmallCard
          dayTitle="Tomorrow"
          img="Shower"
          max={forcastDataList[0]}
          min={forcastDataList[1]}
          temp="C"
        />
        <SmallCard
          dayTitle="Sun, 7 Jun"
          img="LightRain"
          max={forcastDataList[2]}
          min={forcastDataList[3]}
          temp="C"
        />
        <SmallCard
          dayTitle="Sun, 7 Jun"
          img="HeavyRain"
          max={forcastDataList[4]}
          min={forcastDataList[5]}
          temp="C"
        />
        <SmallCard
          dayTitle="Sun, 7 Jun"
          img="LightCLoud"
          max={forcastDataList[6]}
          min={forcastDataList[7]}
          temp="C"
        />
        <SmallCard
          dayTitle="Sun, 7 Jun"
          img="Clear"
          max={forcastDataList[8]}
          min={forcastDataList[9]}
          temp="C"
        />
      </div>

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-5">Today's Highlights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          <LargeCard title="Wind Status" num={windSpeed} desc=" km/h">
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                <i className="fas fa-location-arrow"></i>
              </div>
              <p className="text-gray-150 text-sm">{windDirection}&deg;</p>
            </div>
          </LargeCard>

          <LargeCard title="Humidity" num={humidity} desc="%">
            <div className="self-stretch text-gray-250 text-xs space-y-1">
              <div className="flex justify-between space-x-5 items-center px-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFEC65] h-2"
                  style={{ width: "84%" }}
                ></div>
              </div>
              <p className="text-right">%</p>
            </div>
          </LargeCard>

          <LargeCard title="Visibility" num={visibility} desc=" km" />

          <LargeCard title="Air Pressure" num={pressure} desc=" mb" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;