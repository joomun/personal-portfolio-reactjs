"""
Storage Access Service (SAS) Backend
Flask application with DuckDNS support
"""

import os
import jwt
import json
from datetime import datetime, timedelta
from functools import wraps
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['JWT_EXPIRATION'] = 24 * 3600  # 24 hours

# Store startup time for uptime calculation
STARTUP_TIME = datetime.now()

# Simple user store (replace with database in production)
USERS = {
    os.getenv('SAS_USERNAME', 'admin'): os.getenv('SAS_PASSWORD', 'admin')
}


def token_required(f):
    """Decorator to require JWT token"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'message': 'Invalid token format'}), 401
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = data['user']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated


@app.route('/api/health', methods=['GET'])
@token_required
def health_check(current_user):
    """Check SAS backend health"""
    uptime = datetime.now() - STARTUP_TIME
    uptime_str = f"{uptime.days}d {uptime.seconds // 3600}h {(uptime.seconds // 60) % 60}m"
    
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'uptime': uptime_str,
        'version': '1.0.0',
        'user': current_user
    }), 200


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Authenticate user and issue JWT token"""
    data = request.get_json()
    
    if not data:
        return jsonify({'message': 'No data provided'}), 400
    
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400
    
    # Validate credentials
    if username in USERS and USERS[username] == password:
        # Generate JWT token
        token = jwt.encode({
            'user': username,
            'exp': datetime.utcnow() + timedelta(seconds=app.config['JWT_EXPIRATION'])
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': username,
            'expires_in': app.config['JWT_EXPIRATION']
        }), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/api/auth/logout', methods=['POST'])
@token_required
def logout(current_user):
    """Logout user (client-side token removal)"""
    return jsonify({
        'message': f'User {current_user} logged out successfully'
    }), 200


@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    """Get current user profile"""
    return jsonify({
        'username': current_user,
        'joined': STARTUP_TIME.isoformat(),
        'last_login': datetime.now().isoformat()
    }), 200


@app.route('/api/storage/list', methods=['GET'])
@token_required
def list_storage(current_user):
    """List available storage"""
    return jsonify({
        'storage': [
            {
                'id': 1,
                'name': 'Local Storage',
                'type': 'local',
                'size': '1TB',
                'used': '512GB',
                'available': '488GB'
            },
            {
                'id': 2,
                'name': 'Cloud Storage',
                'type': 'cloud',
                'size': '10TB',
                'used': '2TB',
                'available': '8TB'
            }
        ]
    }), 200


@app.route('/api/storage/<int:storage_id>/files', methods=['GET'])
@token_required
def list_files(current_user, storage_id):
    """List files in storage"""
    return jsonify({
        'storage_id': storage_id,
        'files': [
            {
                'id': 1,
                'name': 'document.pdf',
                'type': 'pdf',
                'size': '2.5MB',
                'created': '2024-01-15T10:30:00Z'
            },
            {
                'id': 2,
                'name': 'image.jpg',
                'type': 'image',
                'size': '5.1MB',
                'created': '2024-01-14T15:45:00Z'
            }
        ]
    }), 200


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({'message': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({'message': 'Internal server error'}), 500


if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV', 'production') == 'development'
    
    print("\n" + "="*50)
    print("Storage Access Service (SAS) Backend")
    print("="*50)
    print(f"Starting server on port {port}...")
    print(f"Debug mode: {debug}")
    print("="*50 + "\n")
    
    # Check if SSL certificates exist
    cert_file = 'sas_cert.pem'
    key_file = 'sas_key.pem'
    
    if os.path.exists(cert_file) and os.path.exists(key_file):
        print("✓ SSL certificates found. Running with HTTPS...")
        app.run(host='0.0.0.0', port=port, debug=debug, ssl_context=(cert_file, key_file))
    else:
        print("⚠ SSL certificates not found. Running with HTTP...")
        app.run(host='0.0.0.0', port=port, debug=debug)
