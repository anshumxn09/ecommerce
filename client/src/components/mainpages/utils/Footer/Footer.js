import React, { useState, useContext } from "react";
import { GlobalState } from "../../../../GlobalState";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const state = useContext(GlobalState);
  const [categories] = state.CategoryAPI.categories;
  const [help] = useState([
    "track your order",
    "Warranty & Support",
    "Return Policy",
    "Service Centers",
    "Bulk Orders",
  ]);
  const [company] = useState([
    "news",
    "read our blog",
    "careers",
    "security",
    "terms of service",
  ]);
  const [name] = useState(["Anshuman" ,"Hamza", "Vansh"]);

  // console.log(categories);
  return (
    <div className="myFooter">
      <p className="brandName">URBANKING</p>
      <div className="infoAboutBrnd">
        <div className="sameFit">
          {categories.map((elem) => {
            return <div className="infoNames">{elem.name}</div>;
          })}
        </div>
        <div className="sameFit">
          {help.map((elem) => {
            return <div className="infoNames">{elem}</div>;
          })}
        </div>
        <div className="sameFit">
          {company.map((elem) => {
            return <div className="infoNames">{elem}</div>;
          })}
        </div>
      </div>
      <div className="infoAboutBrnd">
        {
            name.map(elem => {
                return (
                    <div className="box">
                    <LinkedInIcon className="icon" />
                    <a href="">{elem}</a>
                    </div>
                )
            })
        }
      </div>
    </div>
  );
};

<LinkedInIcon style={{ color: "white" }} />
export default Footer;
