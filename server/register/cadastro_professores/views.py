from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Professor
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model

def home(request):
    return HttpResponse("Bem-vindo ao backend Django!")

class HelloView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Olá, você está autenticado!"})

class CreateUserView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data
        try:
            user = Professor.objects.create_user(
                username=data['username'],
                password=data['password'],
                nome=data['nome'],
                email=data['email'],
                cargo=data['cargo'],
                ni=data['ni']
            )
            return Response({"message": f"Usuário {user.username} criado com sucesso!"}, status=201)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        ni = request.data.get('ni')
        password = request.data.get('password')

        user = get_user_model().objects.get(ni=ni)

        if user:
            # Gerando token de acesso e refresh token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token)
            })
        return Response({'error': 'Credenciais inválidas'}, status=401)