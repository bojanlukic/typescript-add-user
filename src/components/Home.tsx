import { useEffect, useState } from "react";

function Home() {
    const [persons, setPersons] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [position, setPosition] = useState<string>('');

  
  const refresh = () => {
      fetch("http://localhost:3000/PERSON")
      .then((res) => res.json())
      .then((data) => setPersons(data));
    };
    
    useEffect(() => {
      refresh();
    }, []);


    return (
        <div className="persons">
            <div className="alignSearchBar">
                <div className="inputBox">
                    <label>Name</label>
                    &nbsp;
                    <input
                        type="text"
                        className="inputName"
                        placeholder="Search..."
                        value={name}
                        name="name"
                        onChange={(e)=> setName(e.target.value)}
                    />
                    &nbsp;&nbsp;
                    <label>UserType</label>
                    <select
                        className="selectUsertype"
                        name="usertype"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}>
                        <option value="">--Choose Usertype--</option>
                        <option value="Internship">Internship</option>
                        <option value="Employed">Employed</option>
                        <option value="Unemployed">Unemployed</option>
                    </select>
                </div>
                <div className="buttonBox">
                    <button className="buttonsForSearch">Search</button>
                    <button className="buttonsForSearch">Clear</button>
                    <button id="buttonNewUser" className="buttonsForSearch">New User</button>
                </div>
            </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UserType</th>
            <th>City</th>
            <th>Adress</th>
            <th>Created Date</th>
            <th className="alignAction" colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => {
            return (
                <tr key={person.id}>
                <td>{ person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.userType}</td>
                <td>{person.city}</td>
                <td>{person.adress}</td>
                <td>{person.createdDate}</td>
                <td>
                  <button>Edit</button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
