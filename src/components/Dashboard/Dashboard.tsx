import TasksTable from "../Todo/TasksTable.tsx";

export default function Dashboard({username}: { username: string }) {

  // logout by removing the token from local storage
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <>
      <div className="flex flex-row content-between justify-center items-center w-[720px] mt-1">
        <div className={`mx-2 my-2`}>Welcome, <span className="font-bold">{username}</span>!</div>
        <div className={`flex-1`}/>
        <a className={`mx-2 my-2`} onClick={logout}>Logout</a>
      </div>

      <TasksTable/>
    </>
  );
}