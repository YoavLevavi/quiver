import React from "react";
import { MapPin, Phone } from "lucide-react";
import TextBody from "../Text/TextBody";

function UserCardComp({ user, userData }) {
  return (
    <div className="container flex justify-center py-8">
      <div className="w-full max-w-lg flex flex-row shadow p-6 gap-6 ">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <img src={user.photoURL} />
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
