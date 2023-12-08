import { useNavigate } from "react-router-dom";

const ProfileButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/admin/perfil")}
    >
      Perfil
    </button>
  );
};

export default ProfileButton;