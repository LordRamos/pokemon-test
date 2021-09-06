from marshmallow import fields
from main.ext import ma


class PokemonSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    number = fields.Integer(required=True)
    name = fields.String(required=True)
    type1 = fields.String(required=True)
    type2 = fields.String()
    total = fields.Integer(required=True)
    hp = fields.Integer(required=True)
    attack = fields.Integer(required=True)
    defense = fields.Integer(required=True)
    sp_atk = fields.Integer(required=True)
    sp_def = fields.Integer(required=True)
    speed = fields.Integer(required=True)
    generation = fields.Integer(required=True)
    legendary = fields.Boolean(required=True)
