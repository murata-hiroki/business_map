import * as React from "react";
import { Demo } from "../components/Modal";
import { MantineProvider, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MemberList } from "../components/MemberList";
import MobileTreeView from "../components/MobileTree";
import Loading from "../components/Loading";
import CustomCircularTree from "../components/CustomCircularTree";
import { graphql, useStaticQuery } from "gatsby";
import * as styles from "./index.module.scss";

const IndexPage = () => {
  const [treeData, setTreeData] = React.useState(null);
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
  const [searchTerm, setSearchTerm] = React.useState("");

  // GraphQLクエリを使用してYMLファイルからデータを取得
  const data = useStaticQuery(graphql`
    query {
      allProfileYaml {
        nodes {
          id
          name {
            kanji
            kana
          }
          company {
            industry
            name
            address
          }
          lom_name
          entry_year
          phone
          member_pr
          photo_url {
            publicURL
          }
        }
      }
    }
  `);

  // 検索キーワードに基づいてデータをフィルタリング
  const filteredData = searchTerm
    ? data.allProfileYaml.nodes.filter(
        (node) =>
          node.name.kanji.includes(searchTerm) ||
          node.name.kana.includes(searchTerm)
      )
    : [];

  React.useEffect(() => {
    // YMLデータから業種ごとのメンバー数を計算
    const industryCount = data.allProfileYaml.nodes.reduce((acc, node) => {
      const industry = node.company.industry;
      acc[industry] = (acc[industry] || 0) + 1;
      return acc;
    }, {});

    // 初期treeDataを定義
    const initialTreeData = {
      name: "河内地域",
      color: "#4A90E2",
      size: "large",
      children: [
        { name: "飲食", color: "#FF6B6B" },
        { name: "小売販売", color: "#FFA931" },
        { name: "福祉", color: "#4ECDC4" },
        { name: "医療", color: "#45B7D1" },
        { name: "教育", color: "#A569BD" },
        { name: "IT", color: "#27AE60" },
        { name: "金融", color: "#34495E" },
        { name: "印刷", color: "#E67E22" },
        { name: "リサイクル", color: "#2ECC71" },
        { name: "士業", color: "#8E44AD" },
        { name: "行政", color: "#3498DB" },
        { name: "冠婚葬祭", color: "#5D6D7E" },
        { name: "人材派遣", color: "#F1948A" },
        { name: "運送", color: "#16A085" },
        { name: "不動産", color: "#D35400" },
        { name: "建築土木", color: "#F39C12" },
        { name: "製造", color: "#7F8C8D" },
        { name: "その他", color: "#95A5A6" },
      ],
    };

    // メンバー数を反映したtreeDataを作成
    const updatedTreeData = {
      ...initialTreeData,
      memberCount: data.allProfileYaml.nodes.length,
      children: initialTreeData.children.map((child) => ({
        ...child,
        memberCount: industryCount[child.name] || 0,
      })),
    };

    setTreeData(updatedTreeData);
  }, [data]);

  const handleNodeClick = (nodeDatum) => {
    console.log(nodeDatum);
    setSelectedNode({
      name: nodeDatum.name,
      color: nodeDatum.color,
      industries: [nodeDatum.name],
    });
    open();
  };

  const updateDimensions = React.useCallback(() => {
    const treeWrapper = document.getElementById("treeWrapper");
    if (treeWrapper) {
      setDimensions({
        width: treeWrapper.offsetWidth,
        height: treeWrapper.offsetHeight,
      });
    }
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [isLoading, updateDimensions]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <MantineProvider>
      <div className={styles.pageWrapper}>
        <h2 className={styles.title}>河内地域つながりマップ</h2>
        <TextInput
          placeholder="メンバー名で検索"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          className={styles.textInput}
        />
        {filteredData.length > 0 && (
          <div className={styles.results}>
            {filteredData.map((profile, index) => {
              console.log(profile);
              return (
                <a href={profile.id} key={index} className={styles.profileLink}>
                  <div className={styles.profileCard}>
                    <img
                      src={profile.photo_url.publicURL}
                      alt={profile.name.kanji}
                      className={styles.profileImage}
                    />
                    <h3>
                      {profile.name.kanji} ({profile.name.kana})
                    </h3>
                  </div>
                </a>
              );
            })}
          </div>
        )}
        <div
          id="treeWrapper"
          className={styles.treeWrapper}
          style={{ width: "100vw", height: "calc(100vh - 60px)" }}
        >
          {isMobile ? (
            <MobileTreeView data={treeData} onNodeClick={handleNodeClick} />
          ) : (
            <CustomCircularTree
              data={treeData}
              width={dimensions.width}
              height={dimensions.height}
              onNodeClick={handleNodeClick}
            />
          )}
          {selectedNode && (
            <Demo
              opened={opened}
              onClose={close}
              title={selectedNode.name}
              color={selectedNode.color}
            >
              <MemberList industries={selectedNode.industries} />
            </Demo>
          )}
        </div>
      </div>
    </MantineProvider>
  );
};

export default IndexPage;

export const Head = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <title>河内地域つながりマップ</title>
    </>
  );
};
