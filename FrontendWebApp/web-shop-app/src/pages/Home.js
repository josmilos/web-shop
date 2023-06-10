import React from "react";

const HomePage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
    heading: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "16px",
    },
    paragraph: {
      fontSize: "18px",
      lineHeight: "1.5",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Website</h1>
      <p style={styles.paragraph}>
        Thank you for visiting. We hope you have a great experience!
      </p>
    </div>
  );
};

export default HomePage;
