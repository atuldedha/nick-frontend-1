import Link from "next/link";
import React from "react";

// Join Parade button component
const JoinParadeButton = () => {
  const styles = {
    width: "350px",
    padding: "10px 0",
    fontFamily: "Poppins, sans-sarif",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    color: "#ffffff",
    backgroundColor: "var(--primary)",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
  };
  return (
    <Link href={'/applicationForm'}>
    <a>
    <button style={{ ...styles }}>
      Join 2023 Parade
    </button>
    </a>
    </Link>
  );
};

export default JoinParadeButton;
