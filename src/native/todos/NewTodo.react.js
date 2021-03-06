import * as todosActions from '../../common/todos/actions';
import Component from 'react-pure-render/component';
import React from 'react-native';
import fields from '../../common/components/fields';
import {connect} from 'react-redux';

const {
  PropTypes, StyleSheet, TextInput, View
} = React;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#31AACC',
    borderTopColor: '#73CEE7',
    borderTopWidth: 1,
    height: 62
  },
  input: {
    color: '#fff',
    flex: 1,
    fontFamily: 'Helvetica Neue',
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10
  }
});


class NewTodo extends Component {

  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    msg: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.onTextInputEndEditing = this.onTextInputEndEditing.bind(this);
  }

  onTextInputEndEditing() {
    const {addTodo, fields} = this.props;
    if (!fields.title.value.trim()) return;
    addTodo(fields.title.value);
    fields.$reset();
  }

  render() {
    const {fields, msg} = this.props;
    const {title} = fields;

    return (
      <View style={styles.container}>
        <TextInput
          maxLength={100} // React Native needs explicit maxLength.
          onEndEditing={this.onTextInputEndEditing}
          placeholder={msg.newTodoPlaceholder}
          placeholderTextColor={'#cce9f2'}
          style={styles.input}
          {...title}
        />
      </View>
    );
  }

}

NewTodo = fields(NewTodo, {
  path: 'newTodo',
  fields: ['title']
});

export default connect(state => ({
  _newTodo: state.fields.get('newTodo'), // TODO: Redesign field, use connect.
  msg: state.intl.msg.todos
}), todosActions)(NewTodo);
