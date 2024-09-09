import React from "react";
import { Link } from "gatsby";
import { Card, Group, Text, Grid } from "@mantine/core";
import { MantineProvider } from "@mantine/core";
import {
  IconPhone,
  IconBuilding,
  IconBriefcase,
  IconMapPin,
  IconCalendar,
  IconArrowLeft,
} from "@tabler/icons-react";
import * as styles from "../styles/MemberDetail.module.scss";

const MemberDetail = ({ pageContext: { memberData } }) => {
  const { name, company, lom_name, entry_year, phone, member_pr, photo_url } =
    memberData;

  const imageUrl = photo_url ? photo_url.publicURL : null;

  const InfoItem = ({ icon, label, value }) => (
    <Grid gutter="xs" className={styles.info_space}>
      <Grid.Col span={1} className={styles.iconColumn}>
        {icon}
      </Grid.Col>
      <Grid.Col span={11} className={styles.textColumn}>
        <Text>
          <strong>{label}:</strong> {value}
        </Text>
      </Grid.Col>
    </Grid>
  );

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
                  <InfoItem
                    icon={<IconBuilding size={18} />}
                    label="会社名"
                    value={company.name}
                  />
                  <InfoItem
                    icon={<IconBriefcase size={18} />}
                    label="業種"
                    value={company.industry}
                  />
                  <InfoItem
                    icon={<IconMapPin size={18} />}
                    label="所在地"
                    value={company.address}
                  />
                  <InfoItem
                    icon={<IconCalendar size={18} />}
                    label="入会年度"
                    value={entry_year}
                  />
                  <InfoItem
                    icon={<IconPhone size={18} />}
                    label="電話番号"
                    value={phone}
                  />
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
