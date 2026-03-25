import { useState, useEffect } from 'react';
import './UserGenerator.css';

export default function UserGenerator() {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);

    // Função assíncrona para buscar dados da API
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Buscamos 5 usuários aleatórios. 
            // Dica: Altere o número após 'results=' para carregar mais!
            const response = await fetch('https://randomuser.me/api/?results=5');
            const data = await response.json();

            // A API RandomUser entrega os dados dentro da propriedade .results
            setUsuarios(data.results);
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect: Faz a primeira busca assim que o componente é montado
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-container">
            <header className="user-header">
                <h2>👥 Gerador de Equipe</h2>
                <button
                    onClick={fetchUsers}
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