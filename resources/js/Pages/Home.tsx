import Dropdown from "@/Components/Dropdown"
import { PageProps } from "@/types";
import { usePage } from "@inertiajs/react";
import { useState } from "react"
import HomeLayout from "./Layouts/HomeLayout";
import Posts from "./Layouts/partials/Posts";
import Stories from "./Layouts/partials/Story";
import WhatOnYourMind from "./Layouts/partials/WhatOnYourMind";
import Chat from "./Layouts/partials/Chat";
import PeopleYouMayKnow from "./Layouts/partials/PeopleYouMayKnow";

const Home = () => {

  return (
        <HomeLayout whatOnYourMind={<WhatOnYourMind/>} peopleYouMayKnow={<PeopleYouMayKnow/>}>
            <Posts/>
        </HomeLayout>
  )
}

export default Home
