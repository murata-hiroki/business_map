// MemberList.module.css
import React from "react";
import { Card, Avatar } from "@mantine/core";
import * as styles from "../styles/MemberList.module.scss";
import { graphql, Link, useStaticQuery } from "gatsby";

const MemberCard = ({ id, name, company, lom_name, address, photo_url }) => {
  return (
    <Link to={`/${id}`} className={styles.link}>
      <Card className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.avatarContainer}>
            <Avatar size="7rem" src={photo_url} />
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

export const MemberList = ({ industries }) => {
  console.log(industries);
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

  console.log("Industries:", industries);

  const filteredMemberData = industries.includes("河内地域")
    ? data.allProfileYaml.nodes
    : data.allProfileYaml.nodes.filter((node) => {
        console.log(
          `Comparing ${node.company.industry} with ${industries.join(", ")}`
        );
        return industries.includes(node.company.industry);
      });

  if (filteredMemberData.length === 0) {
    return (
      <p className={styles.noMembers}>
        該当する業種のメンバーが見つかりません。
      </p>
    );
  }

  console.log("Filtered member data:", filteredMemberData);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>河内地域メンバーリスト</h1>
      {filteredMemberData.map((memberData, index) => (
        <MemberCard
          key={index}
          id={memberData.id}
          name={memberData.name?.kanji || "名前なし"}
          company={memberData.company?.name || "会社名なし"}
          lom_name={memberData.lom_name || "LOM名なし"}
          address={memberData.company?.address || "住所なし"}
          member_pr={memberData.member_pr}
          photo_url={memberData.photo_url?.publicURL}
        />
      ))}
    </div>
  );
};
