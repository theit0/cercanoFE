import { useAuth0 } from "@auth0/auth0-react";

const ClientProfilePage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>Cargando datos...</div>
    );
  }

  return isAuthenticated ? (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}}>
      <img src={user?.picture} alt={user?.name} />
      <h2 >{user?.nickname}</h2>
      <p>{user?.email}</p>
    </div>
  ) : (
    <div>
      Presiona Log In para ver información de tu perfil.
    </div>
  );
};

export default ClientProfilePage;