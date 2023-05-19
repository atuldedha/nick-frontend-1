import React from "react";
import { useWindowSize } from "../../../utils/WindowResizeHook";
import CreateEmail from "./CreateEmail/CreateEmail";
import MailsList from "./MailsList/MailsList";

// this is the right side of the dashboard page
const MailSection = () => {
  const [width, height] = useWindowSize();
  return (
    // width on the basis of screen size lower screen size take 100 and bigger take 73
    <div style={{ width: width && width > parseFloat(1100) && "100%" }}>
      {/* creating mail option component(upper component) */}
      <CreateEmail />
      {/* mails list component to show mails list on basis of sender(lower component)  */}
      <MailsList />
    </div>
  );
};

export default MailSection;
