import React, { useCallback, useEffect, useState } from "react";
import { Group } from "@visx/group";
import { hierarchy, tree } from "d3-hierarchy";
import { scaleLinear } from "d3-scale";

const CustomCircularTree = ({ data, width, height, onNodeClick }) => {
  const [layout, setLayout] = useState(null);

  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 100;

  // メンバー数に基づいてノードサイズを計算するスケール関数
  const nodeSizeScale = scaleLinear()
    .domain([0, Math.max(...data.children.map((d) => d.memberCount))])
    .range([20, 60]); // 最小サイズ20、最大サイズ60

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

  const getTextColor = (backgroundColor) => {
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "black" : "white";
  };

  const renderNode = (node, index) => {
    if (!node || !node.data) return null;

    const isRoot = node.depth === 0;
    const nodeSize = isRoot ? 80 : nodeSizeScale(node.data.memberCount);

    const angle = node.x - Math.PI / 2;
    const x = Math.cos(angle) * node.y + centerX;
    const y = Math.sin(angle) * node.y + centerY;

    const textColor = getTextColor(node.data.color);

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
          fontSize={isRoot ? 14 : 12}
          fontFamily="Arial"
          textAnchor="middle"
          style={{ pointerEvents: "none" }}
          fill={textColor}
        >
          {node.data.name}
        </text>
        {!isRoot && (
          <text
            dy="1.5em"
            fontSize={10}
            fontFamily="Arial"
            textAnchor="middle"
            style={{ pointerEvents: "none" }}
            fill={textColor}
          >
            ({node.data.memberCount})
          </text>
        )}
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
