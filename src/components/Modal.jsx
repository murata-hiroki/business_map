import * as React from "react";
import { Modal, ScrollArea } from "@mantine/core";
import "@mantine/core/styles.css";

export const Demo = ({ children, opened, onClose, title, color }) => {
  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>Modal with scroll</p>);
  console.log(color);
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={title}
        centered
        size={"xl"}
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
        scrollAreaComponent={ScrollArea.Autosize}
      >
        {children}
      </Modal>
    </>
  );
};
