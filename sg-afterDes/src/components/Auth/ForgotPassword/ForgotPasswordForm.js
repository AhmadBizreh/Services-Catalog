// import { useRef, useState } from "react";

// import "./ForgotPasswordForm.css";

// // import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ForgotPasswordForm = () => {
//   const newNameref = useRef("ahmad");
//   const [nameSteat, setNameSteat] = useState(newNameref);

//   const newPasswordRef = useRef();
//   const oldPasswordRef = useRef();
//   const confOldPasswordRef = useRef();

//   const editPasswrdHanler = (event) => {
//     event.preventDefault();

//     const oldPassword = oldPasswordRef.current.value;
//     const confOldPassword = confOldPasswordRef.current.value;
//     const newPassword = newPasswordRef.current.value;
//     // if (oldPassword === confOldPassword) {
//     //   fetch(
//     //     "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ",
//     //     {
//     //       method: "POST",
//     //       body: JSON.stringify({
//     //         idToken: id,
//     //         password: newPassword,
//     //         returnSecureToken: false,
//     //       }),
//     //       headers: {
//     //         "Content-Type": "application/json",
//     //       },
//     //     }
//     //   )
//     //     .then((res) => {
//     //       if (res.ok) {
//     //         toast("done");
//     //         console.log(res);
//     //         navigate.push("/");
//     //         return res.json();
//     //       } else {
//     //         res.json().then((data) => {
//     //           let errorMassage = "Connection Failed";

//     //           if (data.error.message) {
//     //             errorMassage = data.error.message;
//     //           }
//     //           toast(errorMassage);
//     //           throw new Error(errorMassage);
//     //         });
//     //       }
//     //     })
//     //     .then((data) => {})
//     //     .catch(() => {});
//     //   console.log(newPassword);
//     // } else toast("uncorrect old password");
//   };

//   return (
//     <>
//       <div className="control">
//         <label htmlFor="new-name" style={{ marginRight: 10 }}>
//           Your Email:
//         </label>

//         <input id="new-name" ref={emailRef} />
//       </div>
//     </>
//   );
// };

// export default ForgotPasswordForm;
