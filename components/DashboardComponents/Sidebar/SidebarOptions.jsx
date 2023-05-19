import Image from "next/image";
import React from "react";
import styles from "../../../styles/SidebarOptions.module.css";
import { useWindowSize } from "../../../utils/WindowResizeHook";

const SidebarOptions = ({
  selected,
  text,
  image,
  handleClick,
  index,
  selectedImage,
}) => {
  const [width, height] = useWindowSize();
  return (
    <div
      className={`${selected && styles.selectedBg} ${styles.container}`}
      onClick={() => handleClick(index)}
    >
      {/* option image size based on screen size */}
      {image &&
        (width > parseFloat(530) ? (
          <Image
            src={selected ? selectedImage : image}
            alt="icon"
            width="32px"
            height="32px"
            objectFit="scale-down"
          />
        ) : (
          <Image
            src={selected ? selectedImage : image}
            alt="icon"
            width="25px"
            height="25px"
            objectFit="scale-down"
          />
        ))}
      {/* option text */}
      <span className={`${selected && styles.selectedOption} ${styles.option}`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarOptions;
