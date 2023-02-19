import { TextField } from "@mui/material";
import "firebaseui/dist/firebaseui.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "shared-components/services/auth-context";
import Sidemenu from "shared-components/components/navbar/Sidemenu";

/**
 * User1: user1@real-chat.de     123456
 * User2: user2@real-chat.de     123456
 */

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function goToPage(rout: string) {
    router.push(rout);
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(data.email, data.password);
      goToPage("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidemenu></Sidemenu>
      <section className="cont1">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title has-text-black">Login</h3>
              <hr className="login-hr" />
              <p className="subtitle has-text-black">
                Please login to proceed.
              </p>
              <div className="box">
                <figure className="avatar">
                  <img
                    src="https://www.thispersondoesnotexist.com/image"
                    height="150px"
                    width={"150px"}
                  />
                </figure>

                <form onSubmit={handleLogin}>
                  <div className="field">
                    <div className="control">
                      <TextField
                        sx={{ color: "blue" }}
                        focused
                        margin="normal"
                        type={"email"}
                        label="Username"
                        variant="outlined"
                        required
                        onChange={(e: any) =>
                          setData({ ...data, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <TextField
                        sx={{ color: "blue" }}
                        focused
                        margin="normal"
                        type={"password"}
                        label="Password"
                        variant="outlined"
                        required
                        onChange={(e: any) =>
                          setData({
                            ...data,
                            password: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <button className="button is-block is-info is-large is-fullwidth">
                    Login <i className="fa fa-sign-in" aria-hidden="true"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
