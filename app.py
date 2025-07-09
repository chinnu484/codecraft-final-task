from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# Temporary in-memory storage
todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-todos')
def get_todos():
    return jsonify(todos)

@app.route('/add-todo', methods=['POST'])
def add_todo():
    data = request.get_json()
    task = data.get('task')
    if task:
        todos.append({'task': task, 'id': len(todos)})
        return jsonify({'status': 'success'})
    return jsonify({'status': 'error'})

@app.route('/delete-todo/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return jsonify({'status': 'deleted'})

if __name__ == '__main__':
    app.run(debug=True)
