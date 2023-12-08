import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const AdminPage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      console.log("token: " + token);

      const response = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);

      const responseData = response.statusText;

      alert(responseData);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div >
      ACA VAN LOS PEDIDOS
    </div>
  );
};

export default AdminPage;