import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <motion.div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          border: "5px solid #f3f3f3",
          borderTop: "5px solid #3498db",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loading;
