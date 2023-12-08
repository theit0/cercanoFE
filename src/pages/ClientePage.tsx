import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const ClientePage = () => {
  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const response = await axios.get(
        `${import.meta.env.VITE_API_SERVER_URL}/api/v1/pedidos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      alert(error);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mx-96">
      <h1 className="mb-4 text-2xl font-bold">Vista Cliente.</h1>
      <div className="px-6 mb-4 text-justify">
        Esta es la vista del cliente, podes probar llamando a una api protegida.
      </div>
      <button
        onClick={callApi}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Call Client API
      </button>
    </div>
  );
};

export default ClientePage;

/* const getDomiciliosUsuario = async () => {
  await getAccessTokenSilently()
    .then(async (accessToken) => {
      const response = await getDomicilios(user?.sub!, accessToken);
      setDomicilios(response.data);
      informacionPedido.idDomicilioEntrega = response.data[0].id;
    })
    .catch((err) => {
      const error = err as AxiosError;
      notify(error.response?.data as string, 'error');
    });
}; */