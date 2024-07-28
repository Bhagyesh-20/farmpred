set -o errexit

# Install dependencies
python3 -m pip install -r requirements.txt

# Convert static asset files
python3 manage.py collectstatic 