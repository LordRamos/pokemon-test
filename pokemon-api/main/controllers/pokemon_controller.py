
from main.schemas.pokemon_schema import PokemonSchema
from flask import request, Blueprint
from flask import abort
from flask_restful import Api, Resource, reqparse
from ..schemas.pokemon_schema import PokemonSchema
from ..models.pokemon import Pokemon
from main.utils import add_argument_parser, pop_query_param, remove_none_from_dict, add_argument_parser
from flask_jwt_extended import jwt_required
pokemon_schema = PokemonSchema()
pokemon_v1_bp = Blueprint('pokemon_v1_bp', __name__)
api = Api(pokemon_v1_bp)


class PokemonListResource(Resource):
    parser = reqparse.RequestParser()
    add_argument_parser(Pokemon, parser)
    # get all
    @jwt_required()
    def get(self):

        pokemons = Pokemon.get_queryset()
        # get query params not None
        q_params = remove_none_from_dict(self.parser.parse_args())
        #  get order and sort by
        order = pop_query_param("order", q_params)
        sort_by = pop_query_param("sort_by", q_params)
        # filter
        if(q_params):
            pokemons = Pokemon.filter(pokemons, **q_params)
        # sort
        if order and sort_by:
            pokemons = Pokemon.order_by(
                order, sort_by, pokemons)

        result = pokemon_schema.dump(pokemons.all(), many=True)
        return result
    # create
    @jwt_required()
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
    # get one
    @jwt_required()
    def get(self, id):
        pokemon = Pokemon.get(id)
        if not pokemon:
            abort(404)
        resp = pokemon_schema.dump(pokemon)
        return resp
    # delete
    @jwt_required()
    def delete(self, id):
        pokemon = Pokemon.get(id)
        if not pokemon:
            abort(404)
        resp = pokemon_schema.dump(pokemon)
        return resp
    # update
    @jwt_required()
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
