const fetchUsreInfo = async () => {
    await fetch(`${BaseUrl}api/User/editprofile`, {
      method: "POST",
      body: JSON.stringify({
        // Gender: Customervalues.gender,
        // Age: parseInt(Customervalues.age),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoding(false);
        if (res.ok) {
          alert("Success");
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMassage = "Failed to Share Your Post";
            console.log(errorMassage);
            setLoding(false);
            alert(errorMassage);
            throw new Error(errorMassage);
          });
        }
      })
      .then((data) => {})
      .catch(() => {});
    }