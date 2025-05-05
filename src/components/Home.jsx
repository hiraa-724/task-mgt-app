import React, { useState } from "react";
import { Table, Form, Input, Button, Checkbox, Modal, message } from "antd";

function Home() {
  const [form] = Form.useForm();
  const [tasks, setTasks] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddTask = ({ taskName }) => {
    const newTask = {
      id: Date.now(),
      name: taskName,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    form.resetFields();
  };

  const toggleTaskStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    setTasks((prev) => prev.filter((task) => task.id !== deleteId));
    setIsModalVisible(false);
    message.success("Task deleted");
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          style={{ textDecoration: record.completed ? "line-through" : "none" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Completed",
      key: "completed",
      render: (_, record) => (
        <Checkbox
          checked={record.completed}
          onChange={() => toggleTaskStatus(record.id)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button danger onClick={() => confirmDelete(record.id)}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center bg-slate-300 min-h-screen p-6">
      <h1 className="text-2xl font-bold my-4">List of Tasks</h1>

      <div className="bg-white p-6 rounded shadow w-full max-w-3xl mb-6">
        <Form form={form} layout="inline" onFinish={handleAddTask}>
          <Form.Item
            name="taskName"
            rules={[{ required: true, message: "Task name is required" }]}
          >
            <Input placeholder="Enter task name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Task
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="bg-white p-4 rounded shadow w-full max-w-3xl">
        <Table
          dataSource={tasks}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>

      <Modal
        title="Confirm Delete"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Yes"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this task?</p>
      </Modal>
    </div>
  );
}

export default Home;
