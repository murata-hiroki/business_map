// MemberList.module.css
import React from "react";
import { Card, Avatar } from "@mantine/core";
import * as styles from "../styles/MemberList.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";

const MemberCard = ({ id, name, company, lom_name, address }) => {
  return (
    <Link to={`/${id}`} className={styles.link}>
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.avatarContainer}>
            <Avatar size="7rem" />
          </div>
          <div className={styles.infoContainer}>
            <h3 className={styles.name}>{name}</h3>
            <p className={styles.info}>会社名: {company}</p>
            <p className={styles.info}>所属LOM: {lom_name}</p>
            <p className={styles.info}>所在地: {address}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export const MemberList = ({ nodeName }) => {
  const data = useStaticQuery(graphql`
    query {
      allProfileYaml {
        nodes {
          id
          lom_name
          entry_year
          name {
            kanji
            kana
          }
          phone
          company {
            name
            industry
            address
            description
            overview
            pr
            urls
          }
          member_pr
          photo_url {
            publicURL
          }
        }
      }
    }
  `);

  console.log(nodeName);
  const filteredMemberData = data.allProfileYaml.nodes.filter((node) => {
    console.log(`Comparing ${node.company.industry} with ${nodeName}`);
    return node.company.industry === `${nodeName}`;
  });

  if (filteredMemberData.length === 0) {
    return (
      <p className={styles.noMembers}>
        該当する業種のメンバーが見つかりません。
      </p>
    );
  }

  console.log(filteredMemberData);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>河内地域メンバーリスト</h1>
      {filteredMemberData.map((filteredMemberData, index) => (
        <MemberCard
          key={index}
          id={filteredMemberData.id}
          name={filteredMemberData.name.kanji}
          company={filteredMemberData.company.name}
          lom_name={filteredMemberData.lom_name}
          address={filteredMemberData.company.address}
        />
      ))}
    </div>
  );
};
