import React, {useState} from "react";
import Users from './components/users';
import api from "./api";
import SearchStatus from "./components/searchStatus"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
       setUsers(users.filter((user)=> user._id !== userId));
    }
    const handleToggleBookMark = (userId) => {
       const newUsers = users.map(user => {
         if (user._id === userId) {
            user.bookmark = !user.bookmark;
         }
         return user;
       });
       setUsers(newUsers);  
    }

    if (users.length === 0){
        return <SearchStatus number={users.length}/>;
    }
    
    return (
      <>
         <SearchStatus number={users.length}/>
         <Users 
            users={users}
            onDelete={handleDelete}
            onToggleBookMark={handleToggleBookMark}
         />
      </>
   );
}

export default App;