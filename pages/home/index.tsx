import { Button, Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { useAuth } from "../../shared-components/services/auth-context";
import Navbar from "shared-components/components/navbar/Navbar";
import React from "react";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const navigateToPage = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <Navbar />
      <div className="hamedkabir">
        <Paper
          // sx={{
          //   p: 2,
          //   margin: "auto",
          //   marginTop: 20,
          //   flexGrow: 1,
          // }}
          className="home-content-position"
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            rowSpacing={15}
            columnSpacing={1}
            className=""
          >
            <Grid item xs={6} className="no-padding home-cols-background">
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
                  <h4 className="color-white">Starten Sie einen Host</h4>
                  <p className="">
                    In unserer 3D Zeichen App können Sie Ihre Zeichnungen
                    jederzeit hosten und online teilen. Präsentieren Sie Ihre
                    Projekte der Welt und lassen Sie sich von anderen
                    inspirieren.
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/hosting-page/admin")}
                  >
                    Starte Host
                  </Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} className="no-padding home-cols-background">
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
                  <h4 className="color-white">Verbindung zum Host</h4>
                  <p>
                    Verbinden Sie sich jetzt mit unserem Host und präsentieren
                    Sie Ihre Zeichnungen online. Lassen Sie sich von anderen
                    inspirieren und zeigen Sie, was in Ihnen steckt!{" "}
                  </p>
                  <Button
                    variant="contained"
                    onClick={() => navigateToPage("/hosting-page/join")}
                  >
                    Verbinde Host
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </div>

      {/* <section className="container">
        <div className="columns features">
          <div className="column is-4 modal-button" data-target="modal-image">
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
                  <h4>Testen Sie die XR Umgebung</h4>
                  <p>
                    Testen Sie unseren XR Painter und entdecken Sie die
                    Möglichkeiten der 3D-Malerei in der virtuellen Realität.
                    Lassen Sie Ihrer Kreativität freien Lauf und erschaffen Sie
                    beeindruckende Kunstwerke in einer immersivem Umgebung.
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
      </section> */}
    </>
  );
}
