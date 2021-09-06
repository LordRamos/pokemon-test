from .base_model_mixin import db, BaseModelMixin


class Pokemon(db.Model, BaseModelMixin):
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer)
    name = db.Column(db.String)
    type1 = db.Column(db.String)
    type2 = db.Column(db.String)
    total = db.Column(db.Integer)
    hp = db.Column(db.Integer)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    sp_atk = db.Column(db.Integer)
    sp_def = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    generation = db.Column(db.Integer)
    legendary = db.Column(db.Boolean)
