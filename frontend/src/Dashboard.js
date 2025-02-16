import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Dashboard() {
    const [token, setToken] = useState('');
    const [status, setStatus] = useState({});
    const [authURL, setAuthURL] = useState('');

    useEffect(() => {
        setAuthURL(`https://discord.com/api/oauth2/authorize?client_id=${process.env.REACT_APP_DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REACT_APP_DISCORD_REDIRECT_URI)}&response_type=token&scope=identify`);
    }, []);

    const handleDiscordLogin = () => {
        window.location.href = authURL;
    };

    const fetchStatus = async () => {
        try {
            const response = await axios.get('/api/status', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStatus(response.data);
        } catch (error) {
            alert('Error fetching status');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-4">Minecraft Bot Dashboard</h1>
            {!token ? (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
                    <h2 className="text-xl mb-4">Login with Discord</h2>
                    <button onClick={handleDiscordLogin} className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">Login with Discord</button>
                </div>
            ) : (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl mb-4">Bot Status</h2>
                    <button onClick={fetchStatus} className="w-full bg-green-500 p-2 rounded hover:bg-green-600 mb-4">Check Status</button>
                    <p>Discord Bot: {status.discordBot}</p>
                    <p>Minecraft Bot: {status.mcBot}</p>
                </div>
            )}
        </div>
    );
}