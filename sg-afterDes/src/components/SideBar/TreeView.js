import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";



// const DAME_IND_DATA = [
//   { Name: "webdesign", CategoryId: -1, haschild: false },
//   { Name: "mobielDev", CategoryId: -2, haschild: false },
//   { Name: "Ai", CategoryId: -3, haschild: false },
//   { Name: "ML", CategoryId: -4, haschild: false },
// ];

const TreeView = () => {
  const [data, setData] = useState([]);

//   let url = "http://Servicesscatalog.somee.com/api/CategoriesApi/showparent";

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData("http://Servicesscatalog.somee.com/api/CategoriesApi/showparent");
  }, []);

  //   const renderTreeView = (data) => {
  //     return data.map((item) => {
  //       const children = item.children;
  //       return (
  //         <li key={item.id}>
  //           {item.label}
  //           {children && children.length > 0 && (
  //             <ul>{renderTreeView(children)}</ul>
  //           )}
  //         </li>
  //       );
  //     });
  //   };

  const renderTreeViewPerant = (data) => {
    return data.map((item) => {
      let children = null;
      if (item.haschild === true) {
        toast("item.haschild");
        console.log("item.haschild");        
        children = fetchData(
          `http://Servicesscatalog.somee.com/api/CategoriesApi/showchildern?id=${item.categoryId}`
        );
      } else {
        console.log("item.not.haschild");
        toast("item.no.haschild");  
        children = null;
      }
      return (
        <li key={item.categoryId}>
          {item.name}
          {children && children.length > 0 && (
            <ul>{renderTreeViewPerant(children)}</ul>
          )}
        </li>
      );
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <ul>{renderTreeViewPerant(data)}</ul>
    </>
  );
};

export default TreeView;
