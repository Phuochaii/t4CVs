interface User {
  fullname: string;
  email: string;
}

interface UserInforProps {
  user: User;
}

const UserInfor = ({ user }: UserInforProps) => {
  return (
    <div>
      <h1>User Information</h1>
      <p>Full Name: {user.fullname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserInfor;
