from flask_restful import inputs


def remove_none_from_dict(dict):
    return {k: v for k, v in dict.items() if v is not None}


def pop_query_param(name, query_params):
    return query_params.pop(name)if name in query_params.keys() else None


def add_argument_parser(cls, parser):
    for c in cls.__table__.columns:
        strType = str(c.type)
        # fix python boolean
        ctype = inputs.boolean if strType == "BOOLEAN" else c.type.python_type
        parser.add_argument(c.name, type=ctype)


def set_dict_to_model(model, dict):
    for c in model.__class__.__table__.columns:
        if c.name != "id" and c.name in dict.keys():
            setattr(model, c.name, dict[c.name])
