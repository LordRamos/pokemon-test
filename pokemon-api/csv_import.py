import sqlalchemy as sa
import pandas as pd
from main.config import DevelopmentConfig
from main.models.pokemon import Pokemon


def pokemon_csv_import(file_path):
    cols_names = Pokemon.__table__.columns.keys()[1:]
    con = sa.create_engine(DevelopmentConfig.SQLALCHEMY_DATABASE_URI)
    chunks = pd.read_csv(file_path, chunksize=100000)
    for chunk in chunks:
        new_chunk = chunk.rename(columns=dict(
            zip(chunk.columns, cols_names)))
        new_chunk.to_sql(name=Pokemon.__table__.name, index=False,
                         if_exists='append', con=con)
