import { useState } from "react"
import { useNavigate } from "react-router-dom";

type Person = {
  firstName : string;
  lastName : string;
  userType: string;
  city: string;
  adress: string
}
const AddUser = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<Person>({
    firstName: '',
    lastName: '',
    userType: '',
    city: '',
    adress: ''
  })
  
  
  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  // const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
  //   const { name, value } = event.target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // }

  const addOnClick = () => {

    type Options = {
      weekday:any,
      year: any,
      month:any ,
      day: any,
    };

    const options: Options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date : Date = new Date();
    const dateFormated : string = date.toLocaleString("en-GB" , options);

    fetch("http://localhost:3000/PERSON/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...state,
        createdDate: dateFormated,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Uspesno dodata osoba" , );
        navigate("/");
      })
      .catch((err) => console.log("Greska",err));
  };

  return (
    <div className="container"> 
    <h1>Add New User</h1>
      <div>
        <label>First Name</label>
      <input
          className="inputs"
          type="text"
          name="firstName"
          value={state.firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Last Name</label>
      <input
          className="inputs"
          type="text"
          name="lastName"
          value={state.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Usertype</label>
      <select
         className="inputs"
          name="userType"
          value={state.userType}
          onChange={handleChange}
          required
        >
          <option value="">--Choose Usertype--</option>
          <option value="Internship">Internship</option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
        </select>
      </div>
      <div>
        <label>City</label>
      <input
          className="inputs"
          type="text"
          name="city"
          value={state.city}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Adress</label>
      <input
          className="inputs"
          type="text"
          name="adress"
          value={state.adress}
          onChange={handleChange}
          required
        />
      </div>
      <button
        className="btnConfirm"
        onClick={addOnClick}
        disabled={!state.firstName || !state.lastName || !state.userType || !state.city || !state.adress}
          > 
          Confirm
        </button>
        <button
          className="btnConfirm"
          onClick={() => navigate("/")}
          >
          Cancel
        </button>
          </div>
          
 
);
}
export default AddUser;