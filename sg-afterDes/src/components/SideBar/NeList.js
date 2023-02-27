import * as React from "react";

import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import Label from "@mui/icons-material/Label";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CategoryIcon from "@mui/icons-material/Category";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import "./sidebar.css";
import { useState, useEffect } from "react";

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "#193044",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

function StyledTreeItem(props) {
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    ...other
  } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": "#a2b2c1",
      }}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};
let SeID = "";
export default function NeList() {
  //............................................

  const [data, setData] = useState([]);
  const [hasCH, setHasCH] = useState(true);
  const [children, setChildren] = useState([]);

  const fetchData = async (url, D) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      if (D) {
        setData(json);
      } else {
        setChildren(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(
      "http://Servicesscatalog.somee.com/api/CategoriesApi/showparent",
      true
    );
  }, []);

  const renderTreeViewPerant = (categoryId) => {
    console.log("item.haschild");

    fetchData(
      `http://Servicesscatalog.somee.com/api/CategoriesApi/showchildern?id=${categoryId}`,
      false
    );
  };
  //............................................

  const [selectedCat, setSelectedCat] = useState();

  const [open, setOpen] = useState(false);
  const selectedId = (i) => {
    console.log(i);
    // setSelectedCat(i);
  };

  function alertID(categoryId, h) {
    if (!open && SeID != categoryId) {
      setOpen(true);
      SeID = categoryId;
      console.log(SeID);
      alert(categoryId);
      if (h) {
        renderTreeViewPerant(categoryId);
        setHasCH(true);
        console.log(hasCH);
      } else {
        setHasCH(false);
        console.log(hasCH);
      }

      return;
    } else if (open && SeID === categoryId) {
      setOpen(false);
      SeID = "";
      return;
    } else if (open && SeID != categoryId) {
      setOpen(false);
      SeID = categoryId;
      alert(categoryId);
      return;
    } else if (!open && SeID === categoryId) {
      setOpen(true);
      SeID = "";
      return;
    }
  }

  function alertRotID(id) {
    setSelectedCat(id);
    alert(id);
  }

  const handleChange = (id) => {
    setSelectedCat(id);
    // console.log(selectedCat);
  };

  // let DAME_IND_DATA[] = Categories.child
  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 380, flexGrow: 1, width: 150, overflowY: "auto" }}
    >
      <StyledTreeItem
        nodeId="1"
        labelText="All Posts"
        labelIcon={CategoryIcon}
        onClick={alertRotID}
      />

      <StyledTreeItem nodeId="key" labelText="Categories" labelIcon={Label}>
        {data.map((c) => (
          <StyledTreeItem
            nodeId={c.categoryId}
            labelText={c.name}
            labelIcon={Diversity3Icon}
            labelInfo="90"
            onClick={(e) => {
              alertID(c.categoryId, c.haschild);
            }}
          >
            {c.haschild &&
              children.map((D) => (
                <StyledTreeItem
                  nodeId={D.categoryId}
                  labelText={D.name}
                  labelIcon={Diversity3Icon}
                  labelInfo="90"
                  className="btn"
                  onClick={(e) => {
                    alertRotID(D.id);
                  }}
                  // onClick={clickHanler(D.id)}
                >
                  
                </StyledTreeItem>
              ))}
          </StyledTreeItem>
        ))}
      </StyledTreeItem>
    </TreeView>
  );
}
