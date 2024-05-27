"use client";
import Container from "../Container";
import CategoryBox from "../CategoryBox";

import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This properties close to the beach",
  },
  {
    label: "Windmill",
    icon: GiWindmill,
    description: "This properties has windmills!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This properties has a modern architecture!",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This properties is in the countryside!",
  },
  {
    label: "Pool",
    icon: TbPool,
    description: "This properties has a pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This properties is on an island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This properties is close to a lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This properties has skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This properties is a castle!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This properties has camping activities!",
  },
  {
    label: "Artic",
    icon: BsSnow,
    description: "This properties is in the artic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This properties is in a cave!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This properties is in the desert!",
  },
  {
    label: "Barn",
    icon: GiBarn,
    description: "This properties is a Barn!",
  },
  {
    label: "Luxe",
    icon: IoDiamond,
    description: "This properties is luxurious!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto ">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
