from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Imagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(250), unique=True, nullable=False)

# Metodo construtor da classe
    def __init__(self, filename):
        self.filename = filename


    
