import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUtensils,
  FaStore,
  FaHandHoldingHeart,
  FaHospital,
  FaGraduationCap,
  FaLaptopCode,
  FaMoneyBillWave,
  FaPrint,
  FaRecycle,
  FaBalanceScale,
  FaLandmark,
  FaEllipsisH,
  FaRing,
  FaUserTie,
  FaTruck,
  FaHome,
  FaHardHat,
  FaIndustry,
} from "react-icons/fa";

// 業種とアイコンのマッピング
const industryIcons = {
  飲食: FaUtensils,
  小売販売: FaStore,
  福祉: FaHandHoldingHeart,
  医療: FaHospital,
  教育: FaGraduationCap,
  IT: FaLaptopCode,
  金融: FaMoneyBillWave,
  印刷: FaPrint,
  リサイクル: FaRecycle,
  士業: FaBalanceScale,
  行政: FaLandmark,
  その他: FaEllipsisH,
  冠婚葬祭: FaRing,
  人材派遣: FaUserTie,
  運送: FaTruck,
  不動産: FaHome,
  建築土木: FaHardHat,
  製造: FaIndustry,
};

const MobileTreeView = ({ data, onNodeClick }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);

  const toggleNode = (nodeName, event) => {
    event.stopPropagation();
    setExpandedNodes((prev) =>
      prev.includes(nodeName)
        ? prev.filter((name) => name !== nodeName)
        : [...prev, nodeName]
    );
  };

  const renderNode = (node, level = 0) => {
    const isExpanded = expandedNodes.includes(node.name);
    const hasChildren = node.children && node.children.length > 0;
    const Icon = industryIcons[node.name] || FaEllipsisH;

    return (
      <div key={node.name} style={{ marginLeft: `${level * 20}px` }}>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            cursor: "pointer",
          }}
          onClick={() => onNodeClick(node)}
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
            onClick={(e) => hasChildren && toggleNode(node.name, e)}
          >
            <Icon size={node.size === "large" ? 30 : 20} color="white" />
          </motion.div>
          <span
            style={{
              fontSize: node.size === "large" ? "18px" : "16px",
              fontWeight: level === 0 ? "bold" : "normal",
            }}
          >
            {node.name}({node.memberCount} 人)
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
      {renderNode(data)}
    </div>
  );
};

export default MobileTreeView;
