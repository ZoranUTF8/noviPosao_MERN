import { IoBarChartSharp } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { RiUserSettingsLine } from "react-icons/ri";



const Links = [
  {
    id: 1,
    text: "Statistika",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "Svi poslovi",
    path: "all-jobs",
    icon: <BsCollection />,
  },
  {
    id: 3,
    text: "Dodaj posao",
    path: "add-job",
    icon: <AiOutlineFileAdd />,
  },
  {
    id: 4,
    text: "Moj profil",
    path: "profile",
    icon: <RiUserSettingsLine />,
  },
];

export default Links