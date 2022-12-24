import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../../shared-components/services/auth-context";
import Footer from "components/landingpage/Footer";
import Navbar from "components/landingpage/Navbar";
import React from "react";

export default function Home() {
  const { user } = useAuth();
  console.log("user   ", user);
  const router = useRouter();
  const navigateToPage = (href: string) => {
    router.push(href);
  };

  return (
    <body>
      <Navbar />

      <div className="box cta">
        <p className="has-text-centered">
          <span className="tag is-primary">New</span> Hier können Sie die App
          starten. Wählen Sie ein Funktion.
        </p>
      </div>
      <section className="container">
        <div className="columns features">
          <div className="column is-4">
            <div className="card is-shady">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src="https://source.unsplash.com/RWnpyGtY1aU"
                    alt="Placeholder image"
                    className="modal-button"
                    data-target="modal-image2"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Starten Sie einen Host</h4>
                  <p className="filltext">
                    Purus semper eget duis at tellus at urna condimentum mattis.
                    Non blandit massa enim nec. Integer enim neque volutpat ac
                    tincidunt vitae semper quis.
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/hosting-page/admin")}
                  >
                    Starte Host
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4">
            <div className="card is-shady">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Verbindung zum Host</h4>
                  <p>
                    Purus semper eget duis at tellus at urna condimentum mattis.
                    Non blandit massa enim nec. Integer enim neque volutpat ac
                    tincidunt vitae semper quis.{" "}
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/hosting-page/join")}
                  >
                    Verbinde Host
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-4 modal-button" data-target="modal-image">
            <div className="card is-shady">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src="https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Testen Sie die XR Umgebung</h4>
                  <p>
                    Purus semper eget duis at tellus at urna condimentum mattis.
                    Non blandit massa enim nec. Integer enim neque volutpat ac
                    tincidunt vitae semper quis.
                  </p>

                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/test")}
                  >
                    XR Test
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns features">
          <div className="column is-4 modal-button" data-target="modal-card">
            <div className="card is-shady">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img
                    src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="butterfly image"
                  />
                </figure>
              </div>
              <div className="card-content">
                <div className="content">
                  <h4>Testen Sie den XR Painter</h4>
                  <p>
                    Purus semper eget duis at tellus at urna condimentum mattis.
                    Non blandit massa enim nec. Integer enim neque volutpat ac
                    tincidunt vitae semper quis.
                  </p>

                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/xr-paint")}
                  >
                    XR Test Painter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </body>
  );
}
