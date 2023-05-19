import EmailBlack from "../../../public/mailBlack.png";
import EmailWhite from "../../../public/mailWhite.png";
import WalkieWhite from "../../../public/walkieWhite.png";
import ReceivedWhite from "../../../public/receivedWhite.png";
import ReceivedBlack from "../../../public/receivedBlack.png";
import WalkieBlack from "../../../public/walkieBlack.png";
import DashboardBlack from "../../../public/dashboardBlack.png";
import DashboardWhite from "../../../public/dashboardWhite.png";
import AccountBlack from "../../../public/accountBlack.png";
import AccountWhite from "../../../public/accountWhite.png";

const sidebarOptionsData = [
  {
    text: "Email",
    image: EmailWhite,
    seletedImage: EmailBlack,
  },
  {
    text: "Walkie Talkie System",
    image: WalkieWhite,
    seletedImage: WalkieBlack,
  },
  {
    text: "Received Applications",
    image: ReceivedWhite,
    seletedImage: ReceivedBlack,
  },
  {
    text: "Group List",
    image: "",
    seletedImage: "",
  },
  {
    text: "Volunteers List",
    image: "",
    seletedImage: "",
  },
];

const groupPresidentOptions = [
  {
    text: "Dashboard",
    image: DashboardWhite,
    seletedImage: DashboardBlack,
  },
  {
    text: "UserSettings",
    image: AccountWhite,
    seletedImage: AccountBlack,
  },
];

export { sidebarOptionsData, groupPresidentOptions };
