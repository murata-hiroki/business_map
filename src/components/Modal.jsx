import * as React from "react";
import { Modal } from "@mantine/core";
import "@mantine/core/styles.css";

export const Demo = ({ children, opened, onClose, title, color }) => {
  console.log(color);
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        centered
        styles={{
          header: {
            backgroundColor: `${color}`,
          },
          title: {
            fontSize: "1.2rem",
            flexGrow: 1,
            textAlign: "center",
            margin: 0,
          },
        }}
      >
        {children}
      </Modal>
    </>
  );
};
