'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importa o hook useRouter

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [ni, setNi] = useState('');
    const [cargo, setCargo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Inicializa o hook useRouter

    async function handleRegister(e) {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword){
            setError('As senhas não coincidem.');
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/create-user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, email, nome, ni, cargo })
        });

        setLoading(false);

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            console.log(data.access);

            router.push('/hello'); // Redireciona após o cadastro
        } else {
            alert('Erro ao cadastrar usuário');
            console.log(await response.json());
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            {/* Fundo */}
            <div className="absolute inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/wallpaper4.png)' }}></div>

            {/* Tela de Cadastro */}
            <div className="flex flex-col justify-center items-center relative bg-white rounded-3xl w-[630px] p-10 space-y-10 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold absolute top-6 left-1/2 transform -translate-x-1/2">
                    TeacherPass
                </h2>
                <h2 className="text-4xl font-light mb-6 w-80 text-center">
                    Cadastro de Professor
                </h2>
                <div className="flex justify-center items-center w-full">
                    <form onSubmit={handleRegister} className="space-y-4 flex flex-col justify-center items-center w-full">
                        
                        {/* Nome de Usuário */}
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Nome de usuário"
                                className="h-12 rounded-3xl"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>

                        {/* Nome Completo */}
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Nome Completo"
                                className="h-12 rounded-3xl"
                                onChange={(e) => setNome(e.target.value)}
                                value={nome}
                                required
                            />
                        </div>

                        
                        {/* Email */}
                        <div className="">
                            <Input
                                type="email"
                                placeholder="Email"
                                className="h-12 rounded-3xl"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>


                        {/* Número de Identificação */}
                        <div className="pb-5">
                            <Input
                                type="text"
                                placeholder="Número de Identificação"
                                className="h-12 rounded-3xl"
                                onChange={(e) => setNi(e.target.value)}
                                value={ni}
                                required
                            />
                        </div>

                        {/* Cargo */}
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Cargo"
                                className="h-12 rounded-3xl"
                                onChange={(e) => setCargo(e.target.value)}
                                value={cargo}
                                required
                            />
                        </div>

                        {/* Senha */}
                        <div className="">
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    className="h-12 rounded-3xl"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Senha"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirmação de senha */}
                        <div className="">
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    className="h-12 rounded-3xl"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmação de senha"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Exibir erro caso as senhas não coincidam */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Botão de Cadastro */}
                        <Button className="w-[300] mt-6 h-12 rounded-3xl bg-primary-green hover:bg-secondary-green" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Cadastrar'}
                        </Button>

                        {/* Link para Login */}
                        <Link href="/" className="">
                            <Button className= "rounded-2xl" variant="ghost">
                                Já tem uma conta?
                            </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
