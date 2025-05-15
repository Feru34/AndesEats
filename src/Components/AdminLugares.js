import React from 'react';
import { useAuth, useFirestore } from 'reactfire';
import { useNavigate } from 'react-router-dom';
import './AdminLugares.css';

const AdminLugares = () => {
  const auth = useAuth();
  const firestore = useFirestore();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    if (auth.currentUser) {
      const userDoc = firestore.doc(`users/${auth.currentUser.uid}`);
      userDoc.get().then((doc) => {
        if (doc.exists && doc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          navigate('/'); // Redirige si no es admin
        }
      });
    } else {
      navigate('/'); // Redirige si no está autenticado
    }
  }, [auth.currentUser, firestore, navigate]);

  if (!isAdmin) {
    return <div>Verificando permisos...</div>;
  }

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      {/* Contenido del admin */}
    </div>
  );
};

export default AdminLugares;