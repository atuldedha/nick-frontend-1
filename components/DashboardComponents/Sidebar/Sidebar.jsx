import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/Sidebar.module.css";
import Logo from "../../../public/logo.svg";
import LogoutIcon from "../../../public/signout.png";
import { useWindowSize } from "../../../utils/WindowResizeHook";
import { sidebarOptionsData, groupPresidentOptions } from "./staticData";
import SidebarOptions from "./SidebarOptions";
import AuthContext from "../../../context/AuthContext";
import { useRouter } from "next/router";
import fr from "../../../locales/fr";
import en from "../../../locales/en";

const Sidebar = ({ selected, setSelected, isSysOp }) => {
  const router = useRouter();
  const { locale } = router;
  // language variable
  const t = locale === "fr" ? fr : en;

  const [width, height] = useWindowSize();
  const [openMenu, setOpenMenu] = useState(false);

  // sidebar data
  const [adminSidebarData, setAdminSidebarData] = useState([]);
  const [groupPresidentSidebarData, setGroupPresidentSidebarData] = useState(
    []
  );

  const { logoutUser } = useContext(AuthContext);
  // handle selection for the option change
  const handleSelection = (index) => {
    setSelected(index);
  };

  // to hide or show the sidebar as per screen size
  useEffect(() => {
    if (width && width > parseFloat(1100)) {
      setOpenMenu(true);
    } else {
      setOpenMenu(false);
    }
  }, [width]);

  useEffect(() => {
    const adminSidebar = sidebarOptionsData?.map((data, index) => {
      return {
        ...data,
        text: t?.adminDashboard?.sidebar[index]?.text,
      };
    });

    const groupPresidentSidebar = groupPresidentOptions?.map((data, index) => {
      return {
        ...data,
        text: t?.groupPresidentDashboard?.sidebar[index]?.text,
      };
    });

    setGroupPresidentSidebarData(groupPresidentSidebar);
    setAdminSidebarData(adminSidebar);
  }, [t]);

  return (
    <>
      {width < parseFloat(1100) && (
        // Menu Image if width is smaller then 1100 to open and close sidebar
        <div className={styles.menuContainer} onClick={() => setOpenMenu(true)}>
          <Image
            src="/mobileMenuOpen.png"
            alt="menu"
            width="18px"
            height="18px"
            objectFit="contain"
          />
        </div>
      )}
      {openMenu && (
        <div className={openMenu && width < 1100 ? styles.backdrop : ""}>
          <div className={`${styles.container}`}>
            <div className={styles.sidebarContentWrapper}>
              {/* logo image */}
              <div className={styles.logoContainer}>
                <Image
                  src={Logo}
                  alt="logo"
                  width="338px"
                  height="165px"
                  objectFit="contain"
                />
              </div>

              {/* Sidebar middle section  */}
              {isSysOp ? (
                <div className={styles.optionContainer}>
                  {adminSidebarData?.map((option, index) => (
                    <SidebarOptions
                      key={index}
                      selected={selected === index + 1}
                      index={index + 1}
                      text={option.text}
                      handleClick={handleSelection}
                      image={option.image}
                      selectedImage={option.seletedImage}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.groupPresidentOptionContainer}>
                  {groupPresidentSidebarData?.map((option, index) => (
                    <SidebarOptions
                      key={index}
                      selected={selected === index + 1}
                      index={index + 1}
                      text={option.text}
                      handleClick={handleSelection}
                      image={option.image}
                      selectedImage={option.seletedImage}
                    />
                  ))}
                </div>
              )}

              {/* sidebar footer */}
              <div className={styles.sidebarFooter} onClick={logoutUser}>
                <Image
                  src={LogoutIcon}
                  alt="logout"
                  width="23px"
                  height="29px"
                  objectFit="contain"
                />
                <span className={styles.logoutText}>{t?.logoutText}</span>
              </div>
            </div>
          </div>
          {width < parseFloat(1100) && (
            <div className={styles.close} onClick={() => setOpenMenu(false)}>
              <Image
                src="/close.png"
                alt="close"
                width="15px"
                height="15px"
                objectFit="contain"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;
