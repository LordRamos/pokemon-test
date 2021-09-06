
from main.schemas.pokemon_schema import PokemonSchema
from flask import request, Blueprint
from flask import abort
from flask_restful import Api, Resource
from ..schemas.pokemon_schema import PokemonSchema
from ..models.pokemon import Pokemon
from marshmallow import ValidationError

pokemon_schema = PokemonSchema()
pokemon_v1_bp = Blueprint('pokemon_v1_bp', __name__)
api = Api(pokemon_v1_bp)


class PokemonListResource(Resource):
    def get(self):
        pokemons = Pokemon.get_all()
        result = pokemon_schema.dump(pokemons, many=True)
        return result

    def post(self):
        data = request.get_json()
        errors = pokemon_schema.validate(data)
        if errors:
            return errors, 422
        pokemon_dict = pokemon_schema.load(data)

        pokemon = Pokemon(**pokemon_dict)
        pokemon.save()
        resp = pokemon_schema.dump(pokemon)
        return resp, 201


class PokemonResource(Resource):
    def get(self, id):
        pokemon = Pokemon.get(id)
        if not pokemon:
            abort(404)
        resp = pokemon_schema.dump(pokemon)
        return resp

    def delete(self, id):
        pokemon = Pokemon.get(id)
        if not pokemon:
            abort(404)
        resp = pokemon_schema.dump(pokemon)
        return resp

    def put(self, id):
        data = request.get_json()
        errors = pokemon_schema.validate(data)
        if errors:
            return errors, 422
        pokemon_dict = pokemon_schema.load(data)
        pokemon_dict
        pokemon = Pokemon.get(id)
        if not pokemon:
            abort(404)
        pokemon.save()
        resp = pokemon_schema.dump(pokemon)
        return resp, 201


api.add_resource(PokemonListResource, '/api/v1/pokemon/',
                 endpoint='pokemon_list_resource')
api.add_resource(PokemonResource, '/api/v1/pokemon/<int:id>',
                 endpoint='pokemon_resource')
