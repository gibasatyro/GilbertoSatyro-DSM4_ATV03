from flask import render_template, request, redirect, url_for, flash, session
from models.database import db, Imagem
# Biblioteca para editar a flash message
from markupsafe import Markup # Inclui HTMLdas flash message

import os
import uuid

# Definindo tipos de arquivos permitidos
FILE_TYPES = set(['png', 'jpg', 'jpeg', 'gif'])
def arquivos_permitidos(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in FILE_TYPES

def init_app(app):
    @app.route('/')
    # view function - função de visualização
    def home():
        return render_template('Index.html')

# Rota com o crud de jogos
    @app.route('/Galeria', methods=['GET', 'POST'])
    def galeria(): 
        # Seleciona os nomes dos arquivos de imagens no banco
        imagens = Imagem.query.all()  
              
        if request.method == 'POST':
            # Captura o arquivo vindo do formulário
            file = request.files['filename']
            # Verifica se a extensão do arquivo é permitida
            if not arquivos_permitidos(file.filename):
                flash("Utilize os tipos de arquivos referentes a imagem.", 'danger')
                return redirect(request.url)
            
            # Define um nome aleatório para o arquivo
            filename = str(uuid.uuid4())
            
            # Gravando o nome do arquivo no banco
            img = Imagem(filename)
            db.session.add(img)
            db.session.commit()

            # Salva o arquivo na pasta de uploads
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            flash("Imagem enviada com sucesso!", 'success')
            
            return redirect(url_for('galeria'))
        
        else:              
            # Paginação
            # Captura o valor da página passado pelo get e define o valor padrão como 1 (inteiro)
            page = request.args.get('page', 1, type=int)
            # valor padrão do número de registros por página
            per_page = 16
            # Games page possui apenas os 5 registros da página inicial
            imagens_page = Imagem.query.paginate(page=page, per_page=per_page)
            return render_template('Galeria.html', imagens=imagens_page) 
        