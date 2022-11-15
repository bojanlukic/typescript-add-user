import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);

  useEffect(() => {
    refresh();
  }, []);

  const refresh = () => {
    fetch("http://localhost:3000/PERSON")
      .then((res) => res.json())
      .then((data) => setPersons(data));
  };

  const searchOnClick = () => {
    const filteredPersons: string[] = persons.filter(
      (item) =>
        item.firstName.toLowerCase().startsWith(name.toLowerCase()) &&
        item.userType.includes(position)
    );
    setPersons(filteredPersons);
    if (!name && !position) {
      refresh();
    }
  };
  const clearOnClick = () => {
    setName("");
    setPosition("");
  };

  const deletePerson = (id: number) => {
    fetch(`http://localhost:3000/PERSON/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`Uspesno obrisana osoba ${id}`);
        refresh();
      })
      .catch((err) => console.log("Greska pri ucitavanju URL-a", err));
  };

  const indexOfLastPost: number = currentPage * postsPerPage;
  const indexOfFirstPost: number = indexOfLastPost - postsPerPage;
  const currentPost: any[] = persons.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(persons.length / postsPerPage); i++)
    pageNumbers.push(i);

  const firstButton = () => {
    setCurrentPage(pageNumbers[0]);
  };
  const backButton = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextButton = () => {
    if (pageNumbers.length > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const lastButton = () => {
    setCurrentPage(pageNumbers.length);
  };

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
            onChange={(e) => setName(e.target.value)}
          />
          &nbsp;&nbsp;
          <label>UserType</label>
          &nbsp;
          <select
            className="selectUsertype"
            name="usertype"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            <option value="">--Choose Usertype--</option>
            <option value="Internship">Internship</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
          </select>
          &nbsp; &nbsp;
        </div>
        <div className="buttonBox">
          <button className="buttonsForSearch" onClick={searchOnClick}>
            Search
          </button>
          &nbsp;
          <button className="buttonsForSearch" onClick={clearOnClick}>
            Clear
          </button>
        </div>
        <div className="newUserBox">
          <button
            className="buttonsForSearch"
            id="buttonNewUser"
            onClick={() => navigate("/add")}
          >
            Add User
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
            <th>City</th>
            <th>Adress</th>
            <th>Created Date</th>
            <th className="alignAction" colSpan={2}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {currentPost.map((person) => {
            return (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td>{person.userType}</td>
                <td>{person.city}</td>
                <td>{person.adress}</td>
                <td>{person.createdDate}</td>
                <td>
                  <button
                    className="btnAction"
                    id="btnEdit"
                    onClick={() => navigate(`/edit/${person.id}`)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btnAction"
                    id="btnDelete"
                    onClick={() => deletePerson(person.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {persons.length > 0 ? null : (
        <div className="info">There are no results</div>
      )}
      <div className="navPage">
        <button
          className="buttonsForNav"
          onClick={firstButton}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="buttonsForNav"
          onClick={backButton}
          disabled={currentPage === 1}
        >
          Back
        </button>

        {pageNumbers.map((page) => {
          return (
            <div>
              <button
                key={page}
                id="btnPage"
                className={page === currentPage ? "active" : ""}
                onClick={() => {
                  setCurrentPage(page);
                }}
              >
                {page}
              </button>
            </div>
          );
        })}
        <button
          className="buttonsForNav"
          onClick={nextButton}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
        <button
          className="buttonsForNav"
          onClick={lastButton}
          disabled={currentPage === pageNumbers.length}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Home;
