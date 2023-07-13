import React, { useState } from "react";
import { Button, Checkbox, Form, Input, InputNumber, Typography, Divider } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { redirect, useNavigate, Navigate } from "react-router-dom";
import useHideMenu from "../hooks/useHideMenu";
import { getUsuarioStorage } from "../helpers/getUsuarioStorage";

const { Title, Text } = Typography



const Ingresar = () => {

  useHideMenu(false)
  const [usuario] = useState(getUsuarioStorage());

  const history = useNavigate()
  

  const onFinish = ({ agente, escritorio}) => {
    localStorage.setItem("agente", agente)
    localStorage.setItem("escritorio", escritorio)

    history('/escritorio');
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (usuario.agente && usuario.escritorio) {
    return <Navigate to="/Escritorio"></Navigate>
  }


  return (
    <>
      <Title level={3}> Ingresar </Title>
      <Text> Ingrese su nombre y numero de escritorio </Text>

      <Divider></Divider>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese su nombre",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            {
              required: true,
              message: "Por favor, ingrese su contraseña",
            },
          ]}
        >
          <InputNumber min={1} max={99}/>
        </Form.Item>

        

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined></SaveOutlined>
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Ingresar;
