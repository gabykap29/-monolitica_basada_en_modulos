import { Link } from "react-router-dom";
import Header from "../common/components/Header";
import Sidebar from "../common/components/Sidebar";
import { CardDataAdmin } from "./content/CardData";

const HomePageAdmin = () => {

  return (
    <>
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          {/* Sidebar */}
          <div className="col-md-3 col-lg-2 px-0" style={{ height: "100vh" }}>
            <Sidebar />
          </div>

          {/* Main content */}
          <main className="col-md-9 col-lg-10 px-0" style={{ overflowY: "auto", height: "100%", backgroundColor: "#f0f0f0" }}>
            <Header />
            <div className="container mt-4">
              <div className="row g-4">
                {
                  CardDataAdmin.map( (card, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card shadow-lg border-0" style={{ backgroundColor: card.background, borderRadius: '15px' }}>
                        <div className="card-body text-white">
                          <h5 className="card-title">{card.cardTitle}</h5>
                          <p className="card-text">{card.cardText}</p>
                          <Link to={card.to}>
                            <button className="btn btn-light">Ver más</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default HomePageAdmin;