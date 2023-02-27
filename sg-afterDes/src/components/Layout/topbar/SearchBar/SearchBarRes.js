import React from "react";
import { useState, useEffect } from "react";
import BaseUrl from "../../../URL";
import Feed from "../../../feed/Feed";
import { useParams } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../../../SupportEngine/styles";

const DAME_POST = [
  {
    servicesPostId: "1",
    userId: "1",
    title: "ah",
    description: "Need help to design & develope an e-commerce website.",
    like: "32",
    disLike: "20",
    fullName: "ahmad",
    image: "",
    searchTag: "",
  },
];

const SearchBarRes = () => {
  const [data, setData] = useState([]);
  const [cursor, setCursor] = useState(false);

  const [loading, setLoading] = useState(true);

  const [postSteat, setPostSteat] = useState([]);
  const { q } = useParams();
  const fetchPost = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPostSteat(data);
        console.log("postSteat");
        console.log(postSteat);
        console.log("postSteat");
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // alert(q);
    fetchPost(`${BaseUrl}api/CategoriesApi/searchbytagcategory?tag=${q}`);
    // setLoading(false);
  }, []);

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
      {!loading && (
        <div
          style={{
            display: "flex",
            transform: "none",
            justifyContent: "center",
          }}
        >
          {/* <Treebeard data={data} onToggle={onToggle} style={treeStyle} /> */}
          <div
            style={{
              flex: 9,
              maxWidth: "70%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* <p>ss</p> */}
            {postSteat.length > 0 && !loading && <Feed post={postSteat} />}
          </div>
          {postSteat.length <= 0 && !loading && (
            <div
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
              <p style={{ color: "#164778" }}>No Posts Found </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default SearchBarRes;
