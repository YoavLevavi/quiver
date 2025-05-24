import React from "react";
import { MapPin, Phone } from "lucide-react";

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
            <h3>
              {userData?.first_name} {userData?.last_name}
            </h3>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <MapPin size={16} color="#98a1ae" />
            <p>{userData?.location}</p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <Phone size={16} color="#98a1ae" />
            <p>{userData?.phone_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCardComp;
