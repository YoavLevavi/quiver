import React from "react";
import { MapPin, Phone } from "lucide-react";
import TextBody from "../Text/TextBody";
import clsx from "clsx";

function UserCardComp({ user, userData, className }) {
  return (
    <div className={clsx("card w-80 bg-base-200 rounded-2xl", className)}>
      <div className="flex flex-row p-6 gap-6">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user.photoURL || "../assets/default-avatar.png"} />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex flex-row">
            <TextBody bold={true}>
              {userData?.first_name} {userData?.last_name}
            </TextBody>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <MapPin size={16} color="#98a1ae" />
            <TextBody>{userData?.location}</TextBody>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <Phone size={16} color="#98a1ae" />
            <TextBody>{userData?.phone_number}</TextBody>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCardComp;
