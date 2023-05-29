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
    image: EmailWhite,
    seletedImage: EmailBlack,
  },
  {
    image: WalkieWhite,
    seletedImage: WalkieBlack,
  },
  {
    image: ReceivedWhite,
    seletedImage: ReceivedBlack,
  },
  {
    image: "",
    seletedImage: "",
  },
  {
    image: "",
    seletedImage: "",
  },
];

const groupPresidentOptions = [
  {
    image: DashboardWhite,
    seletedImage: DashboardBlack,
  },
  {
    image: AccountWhite,
    seletedImage: AccountBlack,
  },
];

export { sidebarOptionsData, groupPresidentOptions };
