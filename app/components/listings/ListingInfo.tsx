"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";

interface ListingInfoProps {
  user: SafeUser;
  category: { icon: IconType; label: string; description: string } | undefined;
  description: string;
  roomCount: number;
  bedCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  category,
  description,
  roomCount,
  bedCount,
  guestCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          {" "}
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bedCount} beds -</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
    </div>
  );
};

export default ListingInfo;