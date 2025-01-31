'use client';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
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
    const router = useRouter(); // Inicializa o hook useRouter


    async function handleLogin(e){
        e.preventDefault();

        const response = await fetch('http://127.0.0.1:8000/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ni, password})
        });

        if (response.ok){
            const data = await response.json()
            localStorage.setItem('token', data.access);
            localStorage.setItem('refreshToken', data.refresh)
            console.log(data.access)

            router.push('/hello')
        }else {
            alert('Credenciais inválidas');
            console.log(response);
        }
    }

    return (
        <div className="flex">
            {/* Fundo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/wallpaper.jpg)' }}></div>

            {/* Tela de Login */}
            <div className="flex justify-center items-center min-h-screen relative">
                <div className="bg-white p-8 rounded-3xl min-w-max min-h-max w-[500px] h-[899px] p-[80px]">
                    <h2 className="text-2xl font-bold mb-4">
                        Login
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-4 flex flex-col justify-center items-center">
                        <div className="space-y-2">
                            <Input
                                id='ni'
                                type='text'
                                placeholder='Numero de identificação'
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
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Senha'
                                    required
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full mt-6" type="submit" disabled={loading}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </Button>
                    </form>
                    <div className='flex items-center justify-center pt-2'>
                        <Link href="/Register" className='w-full'>
                            <Button className='w-full' variant={'ghost'}>
                                Cadastrar
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}