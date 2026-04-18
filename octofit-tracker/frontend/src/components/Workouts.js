import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`)
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando entrenamientos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h2>Entrenamientos</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Duración</th>
            <th>Calorías</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout.id}>
              <td>{workout.id}</td>
              <td>{workout.name}</td>
              <td>{workout.duration}</td>
              <td>{workout.calories}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workouts;
