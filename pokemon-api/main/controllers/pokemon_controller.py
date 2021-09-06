
from main.schemas.pokemon_schema import PokemonSchema
from flask import request, Blueprint
from flask import abort
from flask_restful import Api, Resource, reqparse
from ..schemas.pokemon_schema import PokemonSchema
from ..models.pokemon import Pokemon
from marshmallow import ValidationError

parser = reqparse.RequestParser()
parser.add_argument('number', type=int)
parser.add_argument('type1', type=str)
parser.add_argument('type2', type=str)
parser.add_argument('total', type=int)
parser.add_argument('hp', type=int)
parser.add_argument('attack', type=int)
parser.add_argument('defense', type=int)
parser.add_argument('sp_atk', type=int)
parser.add_argument('sp_def', type=int)
parser.add_argument('speed', type=int)
parser.add_argument('generation', type=int)
parser.add_argument('legendary', type=bool)
parser.add_argument('order', type=str)
parser.add_argument('sort_by', type=str)
pokemon_schema = PokemonSchema()
pokemon_v1_bp = Blueprint('pokemon_v1_bp', __name__)
api = Api(pokemon_v1_bp)


class PokemonListResource(Resource):
    def get(self):
        q_params = {k: v for k, v in parser.parse_args().items()
                    if v is not None}
        order = q_params.pop("order")if "order" in q_params.keys() else None
        sort_by = q_params.pop(
            "sort_by")if "sort_by" in q_params.keys() else None
        pokemons = Pokemon.get_queryset()
        # filter
        if(q_params):
            pokemons = Pokemon.filter(pokemons, **q_params)
        # sort
        if order and sort_by:
            pokemons = Pokemon.order_by(
                order, sort_by, pokemons)

        result = pokemon_schema.dump(pokemons.all(), many=True)
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
