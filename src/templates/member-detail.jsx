import React from "react";
import { Link } from "gatsby";
import { Card, Avatar } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import * as styles from "../styles/MemberDetail.module.scss";

const MemberDetail = ({ pageContext: { memberData } }) => {
  const { name, company, lom_name, entry_year, phone, member_pr, photo_url } =
    memberData;

  const imageUrl = photo_url ? photo_url.publicURL : null;
  return (
    <MantineProvider>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink}>
            ← メンバーリストに戻る
          </Link>
          <Card className={styles.card}>
            <div className={styles.profileSection}>
              <div className={styles.imageContainer}>
                <img
                  src={imageUrl}
                  alt={name.kanji}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.infoContainer}>
                <h1 className={styles.name}>{name.kanji}</h1>
                <div className={styles.info}>
                  <p>
                    <strong>会社名:</strong> {company.name}
                  </p>
                  <p>
                    <strong>業種:</strong> {company.industry}
                  </p>
                  <p>
                    <strong>所在地:</strong> {company.address}
                  </p>
                  <p>
                    <strong>所属LOM:</strong> {lom_name}
                  </p>
                  <p>
                    <strong>入会年度:</strong> {entry_year}
                  </p>
                  <p>
                    <strong>電話番号:</strong> {phone}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.description}>
              <h2>会社概要</h2>
              <p>{company.overview}</p>
              <h2>事業内容</h2>
              <p>{company.description}</p>
              <h2>PR</h2>
              <p>{company.pr}</p>
            </div>
            <div className={styles.memberPr}>
              <h2>メンバーPR</h2>
              <p>{member_pr}</p>
            </div>
            {company.urls && company.urls.length > 0 && (
              <div className={styles.urls}>
                <h2>関連URL</h2>
                <ul>
                  {company.urls.map((url, index) => (
                    <li key={index}>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MantineProvider>
  );
};

export default MemberDetail;
