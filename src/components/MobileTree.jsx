import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MobileTreeView = ({ data, onNodeClick }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleNode = (nodeName, event) => {
    event.stopPropagation(); // イベントの伝播を止める
    setExpandedNodes((prev) =>
      prev.includes(nodeName)
        ? prev.filter((name) => name !== nodeName)
        : [...prev, nodeName]
    );
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.includes(node.name);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.name} style={{ marginLeft: `${level * 20}px` }}>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => onNodeClick(node)} // ノード本体のクリックでモーダルを表示
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            style={{
              width: node.size === "large" ? "50px" : "40px",
              height: node.size === "large" ? "50px" : "40px",
              borderRadius: "50%",
              backgroundColor: node.color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "10px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
            }}
            onClick={(e) => hasChildren && toggleNode(node.name, e)} // プラスボタンのクリックで展開/折りたたみ
          >
            {hasChildren && (
              <span style={{ fontSize: "20px", color: "#fff" }}>
                {isExpanded ? "−" : "+"}
              </span>
            )}
          </motion.div>
          <span
            style={{
              fontSize: node.size === "large" ? "18px" : "16px",
              fontWeight: level === 0 ? "bold" : "normal",
            }}
          >
            {node.name}
          </span>
        </motion.div>
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {node.children.map((child) => renderNode(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflowY: "auto",
        height: "100%",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "24px",
          color: "#333",
        }}
      >
        河内地域ビジネスマップ
      </h1>
      {renderNode(data[0])}
    </div>
  );
};

export default MobileTreeView;
