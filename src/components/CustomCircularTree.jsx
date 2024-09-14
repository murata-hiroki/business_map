import React, { useCallback, useEffect, useState } from "react";
import { Group } from "@visx/group";
import { hierarchy, tree } from "d3-hierarchy";

const CustomCircularTree = ({ data, width, height, onNodeClick }) => {
  const [layout, setLayout] = useState(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 100;

  // 固定のノードサイズを設定
  const rootNodeSize = 80;
  const childNodeSize = 40;

  const layoutTree = useCallback(() => {
    const root = hierarchy(data);
    const treeLayout = tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);

    const rootNode = treeLayout(root);
    setLayout(rootNode);
  }, [data, radius]);

  useEffect(() => {
    layoutTree();
  }, [layoutTree]);

  if (!layout) return null;

  const renderNode = (node, index) => {
    if (!node || !node.data) return null;

    const isRoot = node.depth === 0;
    const nodeSize = isRoot ? rootNodeSize : childNodeSize;

    const angle = node.x - Math.PI / 2;
    const x = Math.cos(angle) * node.y + centerX;
    const y = Math.sin(angle) * node.y + centerY;

    return (
      <Group
        key={`node-${index}`}
        top={isRoot ? centerY : y}
        left={isRoot ? centerX : x}
      >
        <circle
          r={nodeSize}
          fill={node.data.color}
          onClick={() => onNodeClick(node.data)}
          style={{ cursor: "pointer" }}
        />
        <text
          dy=".33em"
          fontSize={isRoot ? 18 : 14}
          fontFamily="'Noto Sans JP', 'Hiragino Kaku Gothic Pro', 'Meiryo', sans-serif"
          fontWeight={isRoot ? "bold" : "normal"}
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
          fill={"white"}
        >
          {node.data.name}
        </text>
      </Group>
    );
  };

  const renderLink = (node) => {
    if (node.depth <= 1) return null;

    const startAngle = node.parent.x - Math.PI / 2;
    const startRadius = node.parent.y;
    const endAngle = node.x - Math.PI / 2;
    const endRadius = node.y;

    const startX = Math.cos(startAngle) * startRadius + centerX;
    const startY = Math.sin(startAngle) * startRadius + centerY;
    const endX = Math.cos(endAngle) * endRadius + centerX;
    const endY = Math.sin(endAngle) * endRadius + centerY;

    return (
      <line
        key={`link-${node.data.name}`}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  };

  return (
    <svg width={width} height={height}>
      <Group top={0} left={0}>
        {layout.links().map((link, i) => renderLink(link.target))}
        {layout.descendants().map((node, i) => renderNode(node, i))}
      </Group>
    </svg>
  );
};

export default CustomCircularTree;
