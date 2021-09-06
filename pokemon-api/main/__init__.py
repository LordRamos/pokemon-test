from flask import Flask, jsonify
from flask_restful import Api
# from common.error_handling import ObjectNotFound, AppErrorBaseClass
from .config import config_by_name
from .ext import db, ma, migrate, jwt
from .controllers.pokemon_controller import pokemon_v1_bp
from .controllers.auth_controller import auth_v1_bp
# flask_bcrypt = Bcrypt()


def create_app(config_name):
    app = Flask(__name__)
    api = Api(app, catch_all_404s=True)
    app.config.from_object(config_by_name[config_name])
    # Extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    # Deshabilita el modo estricto de acabado de una URL con /
    app.url_map.strict_slashes = False
    # Registra los blueprints
    app.register_blueprint(pokemon_v1_bp)
    app.register_blueprint(auth_v1_bp)

    # flask_bcrypt.init_app(app)

    return app
