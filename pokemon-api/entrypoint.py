import sys
import os
import unittest
from main import create_app
from csv_import import pokemon_csv_import
app = create_app(os.getenv('BOILERPLATE_ENV') or 'dev')
# app.app_context().push()
if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "csv_import":
        pokemon_csv_import(sys.argv[2])
    else:
        app.run(debug=True)
