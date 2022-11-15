import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Person = {
  firstName: string;
  lastName: string;
  userType: string;
  city: string;
  adress: string;
};
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState<Person>({
    firstName: "",
    lastName: "",
    userType: "",
    city: "",
    adress: "",
  });
    
  useEffect(() => {
    fetchUser(id);
     // eslint-disable-next-line
  }, [id]);
  
  const fetchUser = (id : any) => {
    fetch(`http://localhost:3000/PERSON/${id}`)
      .then(res => res.json())
      .then(data => {
        setState({
          ...state,
          ...data,
      })
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a", err));
  }
  
  const handleChange = (event : any) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };

  // const handleChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
  //   const { name, value } = event.target;
  //   setState({
  //     ...state,
  //     [name]: value,
  //   });
  // }

  const editOnClick = () => {
    type Options = {
      weekday: any,
      year: any,
      month: any,
      day: any,
    };

    const options: Options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date : Date = new Date();
    const dateFormated : string = date.toLocaleString("en-GB", options);
    
    fetch(`http://localhost:3000/PERSON/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...state,
        ModifiedDate: dateFormated
      }),
    })
    .then(res => res.json)
    .then(data => {
      console.log("Izmenjen korisnik", id);
      navigate("/")    
    })
  }

return (
  <div className="container">
    <h1>Edit User (ID {id})</h1>
    <div>
      <label>First Name</label>
      <input
        className="inputs"
        type="text"
        name="firstName"
        value={state.firstName}
        onChange={handleChange}
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
      />
    </div>
    <div>
      <label>Usertype</label>
      <select
        className="inputs"
        name="userType"
        value={state.userType}
        onChange={handleChange}
      >
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
      />
    </div>
    <button
      className="btnConfirm"
      onClick={editOnClick}
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

export default EditUser;
