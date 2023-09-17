import { useParams } from "react-router-dom";

import HomeLayout from "../layouts/HomeLayout";


export default function Room() {
  const params = useParams(); 
  console.log(params);  

  return (
    <HomeLayout>
      <h1>ROOM</h1>
    </HomeLayout>
  );
}