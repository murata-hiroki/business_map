import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

export const DataList = ({ nodeName }) => {
  console.log("Received nodeName:", nodeName); // この行を追加
  const data = useStaticQuery(graphql`
    query {
      allProfileYaml {
        nodes {
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

  const profile = data.allProfileYaml.nodes.find((node) => {
    console.log(`Comparing ${node.company.industry} with ${nodeName}`);
    return node.company.industry === nodeName;
  });
  console.log(profile);

  if (!profile) {
    return <p>プロフィールが見つかりません。</p>;
  }
  console.log(profile);

  return (
    <div className="data-list">
      <h2>{profile.name.kanji} のプロフィール</h2>
      <p>ふりがな: {profile.name.kana}</p>
      <p>入会年度: {profile.entry_year}</p>
      <p>電話番号: {profile.phone}</p>
      <h3>会社情報</h3>
      <p>会社名: {profile.company.name}</p>
      <p>業種: {profile.company.industry}</p>
      <p>住所: {profile.company.address}</p>
      <p>概要: {profile.company.overview}</p>
      <p>PR: {profile.company.pr}</p>
      <h3>メンバーPR</h3>
      <p>{profile.member_pr}</p>
      <img src={profile.photo_url} alt={profile.name.kanji} />
    </div>
  );
};
