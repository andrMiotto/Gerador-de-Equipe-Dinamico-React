import { useState, useEffect } from 'react';
import './UserGenerator.css';

export default function UserGenerator() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [talentos, setTalentos] = useState(0);
    const [genero, setGenero] = useState('');

    const fetchUsers = async (genderFilter = '') => {
        setLoading(true);
        try {
            const response = await fetch(`https://randomuser.me/api/?results=5&gender=${genderFilter}`);
            const data = await response.json();

            setUsuarios(data.results);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const handleFilter = (novoGenero) => {
        setGenero(novoGenero);
        fetchUsers(novoGenero);
    };
    return (
        <div className="user-container">
            <header className="user-header">
                <h2>👥 Gerador de Equipe</h2>
                <span>Total de talentos: {talentos}</span>

                <button onClick={() => {
                    handleFilter('female')
                }}>Apenas Homens</button>
                <button onClick={() => {
                    handleFilter('female')
                }}>Apenas Mulheres</button>
                <button onClick={() => {
                    handleFilter('female')
                }}>Apenas Mulheres</button>
                <button
                    onClick={() => {
                        fetchUsers();
                        setTalentos(talentos + 5)

                    }}
                    disabled={loading}
                    className="refresh-button"

                >
                    {loading ? 'Buscando...' : '🔄 Gerar Novos'}
                </button>
            </header>

            <div className="user-grid">
                {loading ? (
                    <p className="loading-text">Carregando novos perfis...</p>
                ) : (
                    usuarios.map((user) => (
                        <div key={user.login.uuid} className="user-card">
                            <img src={user.picture.medium} alt={user.name.first} />
                            <div className="user-info">
                                <strong>{user.name.first} {user.name.last}</strong>
                                <p>{user.email}</p>
                                <span>📍 {user.location.city}, {user.location.country}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}