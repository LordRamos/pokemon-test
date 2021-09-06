from flask import request, Blueprint
from flask_restful import Api, Resource, reqparse
from main.config import Config
from flask_jwt_extended import create_access_token, create_refresh_token
auth_v1_bp = Blueprint('auth_v1_bp', __name__)
api = Api(auth_v1_bp)


class AuthLoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('username', type=str, required=True)
    parser.add_argument('password', type=str, required=True)

    def post(self):
        data = self.parser.parse_args()
        username = data['username']
        password = data['password']
        if username == Config.TEST_USERNAME and password == Config.TEST_PASSWORD:
            # generating access token and refresh token
            access_token = create_access_token(identity=username)
            refresh_token = create_refresh_token(identity=username)
            return {
                'access_token': access_token,
                'refresh_token': refresh_token
            }, 200

        return {"message": "Invalid Credentials!"}, 401


api.add_resource(AuthLoginResource, '/api/v1/auth/login',
                 endpoint='auth')
