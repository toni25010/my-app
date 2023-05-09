import React, { useState, useEffect } from "react";
import api from "../api"

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.users.fetchAll();
        setUsers(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

const handleDelete = async (userId) => {
  try {
    setUsers((prevState) => prevState.filter(user => user._id !== userId));
  } catch (error) {
    console.error(error);
  }
};




  const renderPhrase = (number) => {
    if (number <= 4 && number > 1) {
      return <h1><span className="badge bg-primary">{number} человека тусанет с тобой сегодня</span></h1>;
    } else {
      return <h1><span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span></h1>;
    }
  };

  if (users.length === 0) {
    return <h1><span className="badge bg-danger">Никто с тобой не тусанет</span></h1>;
    } else {
  return (
    <div>
      {renderPhrase(users.length)}
      <table className="table" key={users.length}>
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
        {users.map((user) => (
          <tr key={user._id}>
            <th scope="row">{user.name}</th>
            <td>
              {user.qualities.map((quality) => (
                <span key={quality._id} className={`badge bg-${quality.color}`} style={{marginRight: "10px"}}>
                  {quality.name}
                </span>
              ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{`${user.rate}/5`}</td>
            <td>
              <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button>
            </td>
          </tr>
        ))}
        </tbody>

      </table>
    </div>
  );
  };
  
};

export default Users;
