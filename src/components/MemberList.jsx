// MemberList.module.css
import React from "react";
import { Card, Avatar } from "@mantine/core";
import * as styles from "../styles/MemberList.module.scss";

const MemberCard = ({ name, company, department, location, position }) => (
  <Card className={styles.card}>
    <div className={styles.cardContent}>
      <div className={styles.avatarContainer}>
        <Avatar size="7rem" />
      </div>
      <div className={styles.infoContainer}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.info}>会社名: {company}</p>
        <p className={styles.info}>所属LOM: {department}</p>
        <p className={styles.info}>所在地: {location}</p>
        <p className={styles.info}>役職: {position}</p>
      </div>
    </div>
  </Card>
);

export const MemberList = () => {
  const members = [
    {
      name: "山田太郎",
      company: "株式会社山田",
      department: "東京JC",
      location: "東京都千代田区",
      position: "代表取締役",
    },
    {
      name: "佐藤花子",
      company: "佐藤建設株式会社",
      department: "大阪JC",
      location: "大阪府大阪市",
      position: "取締役営業部長",
    },
    {
      name: "鈴木一郎",
      company: "鈴木電機株式会社",
      department: "名古屋JC",
      location: "愛知県名古屋市",
      position: "常務取締役",
    },
    // 他のメンバーデータをここに追加...
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>河内地域メンバーリスト</h1>
      {members.map((member, index) => (
        <MemberCard key={index} {...member} />
      ))}
    </div>
  );
};
