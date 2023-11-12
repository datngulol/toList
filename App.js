import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const App = () => {
  const [subjectList, setSubjectList] = useState([
    { id: '1', name: 'Toán' },
    { id: '2', name: 'Văn' },
    { id: '3', name: 'Lý' },
    { id: '4', name: 'Hóa' },
    { id: '5', name: 'Sinh' },
  ]);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [editingSubjectId, setEditingSubjectId] = useState(null);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item.name}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditSubject(item.id, item.name)}
      >
        <Text style={styles.editButtonText}>Sửa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteSubject(item.id)}
      >
        <Text style={styles.deleteButtonText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const handleAddSubject = () => {
    if (newSubjectName) {
      const newSubject = { id: String(subjectList.length + 1), name: newSubjectName };
      setSubjectList([...subjectList, newSubject]);
      setNewSubjectName('');
    }
  };

  const handleEditSubject = (id, name) => {
    setEditingSubjectId(id);
    setNewSubjectName(name);
  };

  const handleUpdateSubject = () => {
    if (newSubjectName && editingSubjectId !== null) {
      setSubjectList((prevSubjects) =>
        prevSubjects.map((subject) =>
          subject.id === editingSubjectId
            ? { ...subject, name: newSubjectName }
            : subject
        )
      );
      setNewSubjectName('');
      setEditingSubjectId(null);
    }
  };

  const handleDeleteSubject = (id) => {
    setSubjectList((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LÊ TIẾN ĐẠT </Text>
      <Text style={styles.header}>Danh sách môn học:</Text>
      <FlatList
        data={subjectList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TextInput
        placeholder="Nhập tên môn học"
        style={styles.input}
        value={newSubjectName}
        onChangeText={(text) => setNewSubjectName(text)}
      />
      {editingSubjectId !== null ? (
        <TouchableOpacity onPress={handleUpdateSubject} style={styles.addButton}>
          <Text style={styles.addButtonText}>Cập nhật</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleAddSubject} style={styles.addButton}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  text: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default App;
