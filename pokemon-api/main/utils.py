

from main.models.pokemon import Pokemon


def remove_none_from_dict(dict):
    return {k: v for k, v in dict.items() if v is not None}


def pop_query_param(name, query_params):
    return query_params.pop(name)if name in query_params.keys() else None


def add_argument_parser(cls, parser):
    for c in cls.__table__.columns:
        parser.add_argument(c.name, type=c.type.python_type)
