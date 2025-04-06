from flask import Flask, render_template
from controllers import routes

# Usar o banco mySql
import pymysql

# Importar o modal
from models.database import db

# Criando a instancia do flask
app = Flask(__name__, template_folder='views')  # representa o nome do arquivo

routes.init_app(app)

# Define o nome do banco de dados
DB_NAME = 'Passaros'
app.config['DATABASE_NAME'] = DB_NAME

# passando o endereço do banco
app.config['SQLALCHEMY_DATABASE_URI'] = F'mysql://root@localhost/{DB_NAME}'
# root:admin@localhost...   Caso seu banco tenha senha

# Secret para as flash messages
app.config['SECRET_KEY'] = 'passatossecret'
# Define o tempo de duração da sessão
app.config['PERMANENT_SESSION_LIFETIME'] = 3600

# Define pasta que receberá arquivos de upload
app.config['UPLOAD_FOLDER'] = 'static/uploads'
# Define o tamanho máximo de um arquivo de upload
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Iniciando o servidor7
if (__name__ == '__main__'):
    # conecta o MySql para criar o banco de dados  (se necessário)
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='',
                                 charset='utf8mb4',
                                 cursorclass=pymysql.cursors.DictCursor)
    try:
        with connection.cursor() as cursor:
            # Cria o banco se ele não existir
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            print(f"O banco de dados está criado!")
    except Exception as e:
        print(f"Erro ao criar banco de dados: {DB_NAME}")
    finally:
        connection.close()
    
    # Inicializa a aplicação flask e cria as tabelas do banco
    db.init_app(app=app)
    # Cria o banco de dados quando a aplicação é rodada
    with app.test_request_context():
        db.create_all()
    app.run(host='0.0.0.0', port=4000, debug=True)
