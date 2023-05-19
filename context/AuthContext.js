import { createContext, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import emailjs from "@emailjs/browser";

//import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const errorTimeout = 2.5; // 2.5 secconds
  //const navigate = useNavigate();

  const registerUser = async (event, login = true) => {
    event.preventDefault();

    const body = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      phoneNumber: event.target.phoneNumber.value,
      email: event.target.email.value,
      password: event.target.password?.value || "",
      confirmPassword: event.target.confirmPassword?.value || "",
      role: "volunteer",
    };

    if (body.password != body.confirmPassword) {
      setTimeout(() => setError(""), errorTimeout * 1000);
      return setError("Password fields do not match.");
    }
    setLoading(true);

    let options = {
      method: "POST",
      url: "/api/user/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    };

    return axios
      .request(options)
      .then(function (response) {
        setLoading(false);

        if (response.data.sendResetMail) {
          return sendMultipleMails([response.data.templateParams]);
        }
        if (login) {
          localStorage.setItem("authToken", response.data.token);
          setToken(response.data.token);
          setUser(jwt_decode(response.data.token));

          router.push("/dashboard");
        } else return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        setTimeout(() => setError(""), errorTimeout * 1000);
        console.log("error while registering user", error);
        setError(error.response?.data?.error);
        return error.response?.data;
      });
  };


  const sendEmail = async (templateName, templateParams, event) => {
    if (event) event.preventDefault();


    let templateId = "";

    if (templateName == "CONTACT")
      templateId = process.env.NEXT_PUBLIC_EMAIL_CONTACT_TEMPLATE_ID
    else if (templateName == "SIMPLE")
      templateId = process.env.NEXT_PUBLIC_EMAIL_SIMPLE_TEMPLATE_ID
    return emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID,
        templateId,
        templateParams,
        process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY
      )
      .then(
        (result) => {
          return true
        },
        (error) => {
          console.log(error.text);
          return false
        }
      );
  };


  const registerGroup = async (event, groupData = null, login = true) => {
    if (event) event.preventDefault();
    let body = groupData;
    if (!body)
      body = {
        name: event.target.groupName.value,
        country: event.target.country?.value || "",
        mainContact: event.target.mainContact?.value || "groupPresident",
        members: [
          {
            firstName: event.target["president:firstName"].value,
            lastName: event.target["president:lastName"].value,
            phoneNumber: event.target["president:phone"].value,
            email: event.target["president:email"].value,
            password: event.target["president:password"].value,
            confirmPassword: event.target["president:confirmPassword"].value,
            role: event.target["president:role"].value,
          },
          {
            firstName: event.target["vicePresident:firstName"].value,
            lastName: event.target["vicePresident:lastName"].value,
            phoneNumber: event.target["vicePresident:phone"].value,
            email: event.target["vicePresident:email"].value,
            role: event.target["vicePresident:role"].value,
            password: "",
          },
        ],
      };

    if (body.members[0].password != body.members[0].confirmPassword) {
      setTimeout(() => setError(""), errorTimeout * 1000);
      return setError(error.response.data.error);
    }

    setLoading(true);

    var options = {
      method: "POST",
      url: "/api/group",
      headers: { "Content-Type": "application/json" },
      data: body,
    };

    return axios
      .request(options)
      .then(async function (response) {
        setLoading(false);
        if (response.data.sendResetMail) {
          const { resetTemplateParams } = response.data;
          sendMultipleMails(resetTemplateParams);
        }
        console.log("login value is ", login);
        if (login) {
          localStorage.setItem("authToken", response.data.token);
          setToken(response.data.token);
          setUser(jwt_decode(response.data.token));
          router.push("/dashboard");
          return;
        } else return response.data;
      })
      .catch(function (error) {
        setLoading(false);
        setTimeout(() => setError(""), errorTimeout * 1000);
        setError(error.response.data?.error);
        return error.response.data;
      });
  };

  const sendMultipleMails = async (templatesArr) => {
    for (let i = 0; i < templatesArr.length; ++i) {
      await sendEmail(templatesArr[i].templateName, templatesArr[i]);
    }
  };

  const getUser = () => {
    return localStorage.getItem("authToken")
      ? jwt_decode(localStorage.getItem("authToken"))
      : null;
  };

  const getToken = () => {
    return localStorage.getItem("authToken");
  };



  useEffect(() => {
    setToken(getToken());
    setUser(getUser());

   
  }, []);

  useEffect(() => {
    if (token) setUser(jwt_decode(token));
  }, [token]);

  const loginUser = async (event) => {
    event.preventDefault();

    setLoading(true);
    axios
      .post(
        `/api/user/login`,
        JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setToken(response.data.token);
        setUser(jwt_decode(response.data.token));
        localStorage.setItem("authToken", response.data.token);
        setLoading(false);
        router.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        setTimeout(() => setError(""), errorTimeout * 1000);
        setError(error.response.data?.error);
      });
  };

  const updateUser = async (event, login = true, body) => {
    if (event && event.preventDefault)
      event.preventDefault();
    if (!body)
      body = {
        firstName: event.target.firstName?.value || false,
        lastName: event.target.lastName?.value || false,
        email: event.target.email.value,
        phoneNumber: event.target.phoneNumber?.value || false,
        walkieTalkieAccess: event.target.walkieTalkieAccess?.value || false,
        newEmail: event.target.newEmail?.value || false,
        password: event.target.password?.value || false,
        oldPassword: event.target.oldPassword?.value || false,
        confirmPassword: event.target.confirmPassword?.value || false,
        role: event.target.role?.value || false,
      };

    body.walkieTalkieAccess = Boolean(body.walkieTalkieAccess);

    if (body.password != body.confirmPassword) {
      setTimeout(() => setError(""), errorTimeout * 1000);
      return setError("Password fields do not match.");
    }

    setLoading(true);
    return axios
      .post(`/api/user/update`, JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((response) => {
        setLoading(false);
        if (login) {
          setUpdatePassword(false);
          setToken(response.data.token);
          setUser(jwt_decode(response.data.token));
          localStorage.setItem("authToken", response.data.token);
          router.push("/dashboard");
          return response.data;
        } else return response.data;
      })
      .catch((error) => {
        setLoading(false);
        setTimeout(() => setError(""), errorTimeout * 1000);
        setError(error.response.data?.error);
        return error.response.data;
      });
  };

  function resetPassword(resetToken, password) {
    setLoading(true);
    var options = {
      method: "POST",
      url: "/api/user/reset-password",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        password: "newpassword",
        token: resetToken,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLoading(false);
        console.log(response.data);
        if (response.data.success) router.push("/signin");
      })
      .catch(function (error) {
        setLoading(false);
        console.error(error);
        setError(
          error.response.data?.error ||
          "Some thing went wrong while reseting password. Try again."
        );
      });
  }

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    router.replace("/");
  };

  const contextData = {
    resetPassword: resetPassword,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    registerGroup: registerGroup,
    updateUser: updateUser,
    token: token,
    getToken: getToken,
    setToken: setToken,
    user: user,
    setUser: setUser,
    getUser: getUser,
    error: error,
    setError: setError,
    loading: loading,
    setLoading: setLoading,
    updatePassword: updatePassword,
    setUpdatePassword: setUpdatePassword,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
