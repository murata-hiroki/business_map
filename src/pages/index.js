import * as React from "react";
import Tree from "react-d3-tree";
import "./style.scss";
import { Demo } from "../components/Modal";
import { MantineProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MemberList } from "../components/MemberList";
import MobileTreeView from "../components/MobileTree";
import Loading from "../components/Loading";

const IndexPage = () => {
  const [translate, setTranslate] = React.useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const treeData = [
    {
      name: "河内地域",
      color: "#add8e6",
      size: "large",
      children: [
        {
          name: "暮らし",
          color: "#20a5e8",
          size: "medium",
          children: [
            {
              name: "不動産",
              color: "#7bc4e6",
            },
            {
              name: "建築",
              color: "#cfdeeb",
            },
          ],
        },
        {
          name: "IT技術製造",
          color: "#e6a823",
          size: "medium",
          children: [
            {
              name: "IT",
              color: "#efd6c9",
            },
            {
              name: "製造",
              color: "#f3bea5",
            },
          ],
        },
        {
          name: "農業水産業",
          color: "#7cde88",
          size: "medium",
          children: [
            {
              name: "農林水産業",
              color: "#ace29a",
            },
            {
              name: "小売業",
              color: "#d4f0cb",
            },
          ],
        },
        {
          name: "飲食サービス",
          color: "#efc8eb",
          size: "medium",
          children: [
            {
              name: "飲食",
              color: "#efc8eb",
            },
            {
              name: "サービス",
              color: "#d061c4",
            },
          ],
        },
        {
          name: "ビジネス金融行政",
          color: "#feff2d",
          size: "medium",
          children: [
            {
              name: "行政",
              color: "#d4d4d4",
            },
          ],
        },
      ],
    },
  ];

  const collectNodeNames = (node) => {
    let names = [node.name];
    if (node.children) {
      node.children.forEach((child) => {
        names = names.concat(collectNodeNames(child));
      });
    }
    return names;
  };

  const handleNodeClick = (nodeDatum) => {
    const nodeNames = collectNodeNames(nodeDatum);
    setSelectedNode({
      name: nodeDatum.name,
      color: nodeDatum.color,
      industries: nodeNames,
    });
    open();
    console.log("Selected node:", nodeDatum.name);
    console.log("Industries:", nodeNames);
  };

  const updateDimensions = React.useCallback(() => {
    const treeWrapper = document.getElementById("treeWrapper");
    if (treeWrapper) {
      const dimensions = treeWrapper.getBoundingClientRect();
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 3,
      });
    }
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px以下をモバイルとみなす
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    // データの読み込みをシミュレート
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2秒後にローディングを終了
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
    }
  }, [isLoading, updateDimensions]);

  // ローディング状態のチェック
  if (isLoading) {
    return <Loading />;
  }

  const getNodeSize = (size) => {
    switch (size) {
      case "small":
        return 40;
      case "medium":
        return 60;
      case "large":
        return 80;
      default:
        return 40;
    }
  };

  const renderCustomNode = ({ nodeDatum }) => {
    const radius = getNodeSize(nodeDatum.size);
    return (
      <g onClick={() => handleNodeClick(nodeDatum)}>
        <circle
          r={radius}
          fill={nodeDatum.color || "lightblue"}
          stroke="black"
          strokeWidth="1.5"
        />
        <text
          fill="black"
          x="0"
          y="0"
          textAnchor="middle"
          alignmentBaseline="central"
          style={{ fontSize: "12px", stroke: "none", pointerEvents: "none" }}
        >
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  const separation = { siblings: 1, nonSiblings: 1 };

  return (
    <MantineProvider>
      <div
        id="treeWrapper"
        className="treeWrapper"
        style={{ width: "100vw", height: "100vh" }}
      >
        {isMobile ? (
          <MobileTreeView data={treeData} onNodeClick={handleNodeClick} />
        ) : (
          <Tree
            data={treeData}
            renderCustomNodeElement={renderCustomNode}
            orientation="radial"
            separation={separation}
            translate={translate}
            pathFunc="straight"
            zoomable={false}
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
    </MantineProvider>
  );
};

export default IndexPage;

export const Head = () => <title>河内地域ビジネスマップ</title>;
