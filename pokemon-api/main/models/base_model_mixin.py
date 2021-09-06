from main.ext import db


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
    def get(cls, id):
        return cls.query.get(id)

    @classmethod
    def filter(cls, **kwargs):
        return cls.query.filter_by(**kwargs).all()
