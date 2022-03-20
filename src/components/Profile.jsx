import React from 'react'
import { useParams } from "react-router-dom";

const Profile = () => {
  const { userId} = useParams();
  return (
    <div>This is the profile for {userId}</div>
  )
}

export default Profile