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
            
            setTalentos(prev => prev + 5); 
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

    const limparLista = () => {
        setUsuarios([]);
    };

    return (
        <div className="user-container">
            <header className="user-header">
                <h2>👥 Gerador de Equipe</h2>
                <span>Total de talentos encontrados: {talentos}</span>
                
                <button onClick={() => handleFilter('male')}>Apenas Homens</button>
                <button onClick={() => handleFilter('female')}>Apenas Mulheres</button>
                <button
                    onClick={() => fetchUsers(genero)}
                    disabled={loading}
                    className="refresh-button"
                >
                    {loading ? 'Buscando...' : '🔄 Gerar Novos'}
                </button>
                
                <button onClick={limparLista} className="clear-button">
                    🧹 Limpar Lista
                </button>
            </header>

            <div className="user-grid">
                {loading ? (
                    <p className="loading-text">Carregando novos perfis...</p>
                ) : usuarios.length === 0 ? (
                    <p className="empty-text">Nenhum usuário selecionado. Clique em Gerar Novos.</p>
                ) : (
                    usuarios.map((user) => (
                        <div 
                            key={user.login.uuid} 
                            className={`user-card ${user.dob.age >= 50 ? 'senior-card' : ''}`}
                        >
                            <img src={user.picture.medium} alt={user.name.first} />
                            <div className="user-info">
                                <strong>{user.name.first} {user.name.last}</strong>
                                <p>{user.email}</p>
                                
                                {user.dob.age >= 50 && <span className="badge badge-senior">⭐ Sênior</span>}
                                {user.dob.age < 30 && <span className="badge badge-jovem">🌱 Jovem Talento</span>}
                                
                                <span>📍 {user.location.city}, {user.location.country}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}