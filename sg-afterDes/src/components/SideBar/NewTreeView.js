import React, { useState, useEffect } from "react";
import { Treebeard } from "react-treebeard";
import Feed from "../feed/Feed";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../SupportEngine/styles";
import BaseUrl from "../URL";

const DAME_POST = [
  {
    name: "ahmad",
    userId: "1",
    id: 1,
    desc: "Need help to design & develope an e-commerce website.",
    date: "5 mins ago",
    userId: 1,
    like: 32,
    comment: 9,
  },
  {
    name: "ahmad",
    userId: "2",

    id: 2,
    desc: "We are looking for an experience facebook advertiser",
    date: "15 mins ago",
    userId: 2,
    like: 2,
    comment: 1,
  },
  {
    name: "ahmad",
    userId: "3",

    id: 3,
    desc: "I need logo designer for my e-commerce store.",
    date: "1 hour ago",
    userId: 3,
    like: 61,
    comment: 2,
  },
  {
    name: "ahmad",
    userId: "4",

    id: 4,
    desc: "We are looking for an experience facebook advertiser",
    date: "4 hours ago",
    userId: 4,
    like: 7,
    comment: 3,
  },
  {
    name: "ahmad",
    userId: "5",

    id: 5,
    desc: "Love For All, Hatred For None.",
    date: "5 hours ago",
    userId: 5,
    like: 23,
    comment: 5,
  },
  {
    name: "ahmad",
    userId: "6",

    id: 6,
    desc: "Love For All, Hatred For None.",
    date: "1 day ago",
    userId: 6,
    like: 44,
    comment: 6,
  },
  {
    name: "ahmad",
    userId: "7",

    id: 7,
    desc: "Never regret anything that made you smile.",
    date: "2 days ago",
    userId: 7,
    like: 52,
    comment: 3,
  },
  {
    name: "ahmad",
    userId: "8",

    id: 8,
    desc: "Love For All, Hatred For None.",
    date: "3 days ago",
    userId: 8,
    like: 15,
    comment: 1,
  },
  {
    name: "ahmad",
    userId: "9",

    id: 9,
    desc: "Change the world by being yourself.",
    date: "5 days ago",
    userId: 9,
    like: 11,
    comment: 2,
  },
  {
    name: "ahmad",
    userId: "10",

    id: 10,
    desc: "Love For All, Hatred For None.",
    date: "1 week ago",
    userId: 10,
    like: 104,
    comment: 12,
  },
];

const NewTreeView = () => {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(false);
  const [postSteat, setPostSteat] = useState([]);
  const [loading, setLoading] = useState(true);

  const treeStyle = {
    tree: {
      base: {
        // listStyle: "none",
        // backgroundColor: "#d0deed",
        backgroundColor: "white",
        marginLeft: 10,
        marginTop: 20,
        // display: "flex",
        maxWidth: "40%",
        minHeight: 670,
        padding: 0,
        color: "rgb(35,31,32)",
        fontFamily: '"Helvetica Neue", "Open Sans", Arial, sans-serif',
        fontSize: "1.4rem",
      },
      node: {
        base: {
          position: "relative",
        },
        link: {
          cursor: "pointer",
          position: "relative",
          padding: "8px 0px",
          display: "block",
        },
        activeLink: {
          background: "#d0deed",
        },
        toggle: {
          base: {
            position: "relative",
            display: "inline-block",
            verticalAlign: "top",
            marginLeft: "1px",
            height: "8px",
            width: "20px",
          },
          wrapper: {
            position: "absolute",
            top: "50%",
            left: "50%",
            margin: "-7px 0 0 -7px",
            height: "10px",
          },
          height: 14,
          width: 14,
          arrow: {
            fill: "#164778",
            strokeWidth: 0,
          },
        },
        header: {
          base: {
            display: "inline-block",
            verticalAlign: "top",
            color: "rgb(35,31,32)",
          },
          connector: {
            width: "2px",
            height: "12px",
            borderLeft: "solid 2px black",
            borderBottom: "solid 2px black",
            position: "absolute",
            top: "0px",
            left: "-21px",
          },
          title: {
            lineHeight: "24px",
            verticalAlign: "middle",
          },
        },
        subtree: {
          listStyle: "none",
          paddingLeft: "19px",
        },
        loading: {
          color: "#E2C089",
        },
      },
    },
  };

  const fetchTreeView = async (url) => {
    setLoading(true);
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((treeview) => {
        setData(treeview.categories);
        // console.log(treeview.categories);
        setLoading(false);
      });
  };
  const fatchPosts = async (url) => {
    setLoading(true);
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        setPostSteat(posts);
        console.log("ahmadPostes");
        console.log(posts);
        console.log("ahmadPostes");

        setLoading(false);
      });
  };

  useEffect(() => {
    // fetchTreeView("http://sc.somee.com/api/CategoriesApi/showtree");
    fetchTreeView(`${BaseUrl}api/CategoriesApi/showtree`);
    //API FOR ALL POSTS
    fatchPosts(`${BaseUrl}api/ServicesPosts/viewpostwithuserinfo`);
  }, []);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    // alert(node.id);
    //API FOR CAT POSTS
    fatchPosts(
      `${BaseUrl}api/ServicesPosts/viewpostsbycategoryid?cateId=${node.id}`
    );

    setCursor(node);
    setData([...data]);
  };
  // const AllPostsHandler = () => {

  // };

  return (
    <>
      {loading && (
        <LoadingOutlined
          className="transition-5"
          style={{
            ...styles.loadingIcon,
            ...{
              zIndex: loading ? "10" : "-1",
              opacity: loading ? "1" : "0",
              fontSize: "82px",
              top: "calc(50% - 41px)",
              left: "calc(50% - 41px)",
            },
          }}
        />
      )}

      <div style={{ display: "flex", transform: "none" }}>
        <Treebeard data={data} onToggle={onToggle} style={treeStyle} />

        <div style={{ flex: 9, display: "flex", justifyContent: "center" }}>
          {!loading && postSteat.length > 0 && data.length !== 0 && (
            <Feed post={postSteat} />
          )}
          {!loading && postSteat.length === 0 && (
            <p
              style={{
                position: "absolute",
                marginTop: "20%",
                backgroundColor: "#E6E6E6",
                height: 33,
                width: 160,
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                borderRadius: 10,
              }}
            >
              No Posts Found{" "}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
export default NewTreeView;
