'use client';

export default function Index() {
  return (
    <div className="flex">
            {/* Fundo */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/wallpaper.jpg)' }}></div>
            
            
            {/* Tela de Login */}
            <div className="flex justify-center items-center min-h-screen relative">
                <div className="bg-white p-8 rounded-lg min-w-max min-h-max">
                    <h2 className="text-2xl font-bold mb-4">
                        Login
                    </h2>
                </div>
                
            </div>
    </div>
    );
}