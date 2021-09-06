from main.ext import db
from sqlalchemy import desc, asc


class BaseModelMixin:
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        return cls.query.all()

    @classmethod
    def get_queryset(cls):
        return cls.query

    @classmethod
    def get(cls, id):
        return cls.query.get(id)

    @classmethod
    def filter(cls, queryset=None, **kwargs):
        queryset = queryset if queryset else cls.query
        return queryset.filter_by(**kwargs)

    @classmethod
    def order_by(cls, order_type, field_name, queryset=None):
        queryset = queryset if queryset else cls.query
        if order_type == "desc":
            return queryset.order_by(desc(getattr(cls, field_name)))
        else:
            return queryset.order_by(asc(getattr(cls, field_name)))
