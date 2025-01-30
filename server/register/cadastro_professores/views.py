from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Professor

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
