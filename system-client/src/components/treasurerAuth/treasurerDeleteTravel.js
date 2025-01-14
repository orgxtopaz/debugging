import React from "react";

///FORM,YUP, ALL FOR VALIDATION ALSO AXIOS FOR THE API
import { useParams } from "react-router-dom"; // returns: an object of key/value pairs of URL parameters

import { useState } from "react"; //HERE we import useState Hook so we can add state to our functional components.
import Axios from "axios"; //allows us to make GET and POST requests from the browser.

import { BrowserRouter as Router, Route, Link } from "react-router-dom"; //routes
import { useEffect } from "react"; //a hook that GIVES  "side-effects"
import { useHistory } from "react-router-dom"; // allows us to access our path / route history.

//IMPORT FOR THE TOASTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import treasurerTravels from '../img/travel.svg' 

  //CONFIGURING TOASTIFY
toast.configure();

function TreasurerDeleteTravel() {
  
  let { travelId } = useParams();

  const [travelDetails, setTravelDetails] = useState([]);

  //  RETRIEVE/SHOW SPECIFIC  Users Data by its ID with the use of params---------------------------------------
  const isLoaded = [true];
  // IF PAGE IS LOADED THEN THIS WILL HAPPEN WITH THE USE OF useEffect
  useEffect(() => {
    if (isLoaded) {

      Axios.post(`https://orgserver.herokuapp.com/viewTravel/${travelId}`,{
        headers: { "x-access-token": localStorage.getItem('treasurer') }, email: localStorage.getItem("Email")

      }).then(
        (response) => {
          setTravelDetails(response.data);
        }
      );
    }
  }, isLoaded);






  //WHEN USER CLICK THE BUTTON DELETE
  let history = useHistory(); //USE HISTORY  it will DETERMINED OUR PAST PATH.

  //FUNCTION TO DELETE USER
  const deleteTravel = () => {
  
    function save() {
      toast.success("Deleted Successfully❗", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

       ////DELETE DATA ON DATABASE------------------------------------------
      Axios.delete(`https://orgserver.herokuapp.com/deleteTravel/${travelId}`,{
        headers: { "x-access-token": localStorage.getItem('sk') }, email: localStorage.getItem("Email")

      }).then(
        (response) => {
          console.log("User Deleted Successfully!");
          history.push("/treasurerTravel"); //GOING BACK TO HOME PAGE / MAIN PAGE
          window.location.reload();
        
        }
      );
    
    }

    //----------------------------------
    const cancel = () => {
      window.location.reload();
    };

    const CustomToast = (closeToast) => {
      return (
        <div style={{ width: "300px" }}>
          <p>Are you sure you want to delete this Travel record?</p>
          <button type="submit" onClick={save} className="btn ">
            <i className="btn  bi bi-check2" style={{ fontSize: "25px" }}></i>
          </button>

          <button type="submit" onClick={cancel} className="btn ">
            <i className="btn  bi bi-x" style={{ fontSize: "25px" }}></i>
          </button>

        </div>
      );
    };

    ///--------------------------------
    toast.info(<CustomToast />, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: false,
      closeOnClick: false,
      icon: false,
    });
  };
   //    ///CHECKING IF USER IS AUTHENTICATED WITH TOKEN
   if(localStorage.getItem('treasurer')==null){
    history.push("/")
   }

  return (
    <>
     <div className="container" style={{top:"330px",height:"395px"}}>
          <div className="svg-background"></div>
          <div className="svg-background2"></div>
          <div className="circle"></div>
          <img
            className="menu-icon"
            src="https://pngimage.net/wp-content/uploads/2018/06/white-menu-icon-png-8.png"
          />
          <img
            className="profile-img"
            src={treasurerTravels}
          ></img>
          <div className="text-container" style={{left:"230px"}}>
           
            <p></p>

            <div className="form-group">
              <input
                type="text"
                value={"👤 " + travelDetails.fullname}
                readOnly
                className="form-control"
                 style={{width:"90%"}}
              />
            </div>
            <p></p>
            <div className="form-group">
              <input
                type="email"
                value={"📅 "+travelDetails.date}
                className="form-control"
                 style={{width:"90%"}}
                 readOnly
               
            
              />
              <p></p>
            
              
            </div>

            <div className="form-group">
              <input
                type="text"
                 style={{width:"90%"}}
                value={"🎯 "+travelDetails.purpose}
                className="form-control"
                readOnly
              />       
              <p></p>
            
            </div>

            
        
          

            <div className="form-group">
              <input
                type="text"
                value={"🏅 "+travelDetails.position}
                style={{width:"90%"}}
                readOnly
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit"  onClick={deleteTravel} className="btn "  >
            <i
          className="btn  bi bi-trash-fill"
          style={{ fontSize: "25px", color:'#FF0000' }}

        ></i>
            </button>
          </div>
        </div>

        <Link to="/treasurerTravel">
        <i
          className="btn  bi bi-arrow-counterclockwise"
          style={{ fontSize: "40px" }}
        ></i>
      </Link>
    </>
  );
}

export default TreasurerDeleteTravel;
