'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Importa o hook useRouter

export default function Index() {
    const [ni, setNi] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter(); // Inicializa o hook useRouter


    async function handleLogin(e) {
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ni, password })
        });

        if (response.ok) {
            const data = await response.json()
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh)
            console.log(data.access)

            router.push('/hello')
        } else {
            setError('Credenciais inválidas');
            console.log(response);
        }
    }

    return (
        <div className="flex justify-center">
            {/* Fundo */}
            <div className="absolute inset-0 w-screen h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/wallpaper2.png)' }}></div>

            {/* Tela de Login */}
            <div className="flex flex-col justify-center items-center relative bg-white rounded-3xl min-w-max min-h-max w-[630px] h-[809] p-10 space-y-10  mt-20">
                <h2 className="text-2xl font-bold absolute top-10 left-1/2 transform -translate-x-1/2">
                    TeacherPass
                </h2>
                <h2 className="text-5xl font-light mb-6 w-80 text-center">
                    Olá, seja bem-vindo
                </h2>
                <div className="flex justify-center items-center w-full">
                    <form onSubmit={handleLogin} className="space-y-4 flex flex-col justify-center items-center">
                        <div className="space-y-2">
                            <Input
                                id='ni'
                                type='text'
                                placeholder='Numero de identificação'
                                className='h-12 rounded-3xl'
                                onChange={(e) => setNi(e.target.value)}
                                value={ni}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="relative">
                                <Input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    className='h-12 rounded-3xl'
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Senha'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 '
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <Button className="w-full mt-6 h-12 rounded-3xl bg-primary-green  hover:bg-secondary-green" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </Button>
                        <Link href="/Cadastro" className='w-full'>
                            <Button className='w-full rounded-2xl' variant={'ghost'}>
                                Cadastrar
                            </Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}