import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useContext, useState } from "react";
const { Header, Sider, Content } = Layout;

import { BrowserRouter as Router, Route, Link, Routes, redirect } from "react-router-dom";
import Ingresar from "./Ingresar";
import Cola from "./Cola";
import CrearTicket from "./CrearTicket";
import Escritorio from "./Escritorio";
import { UiContext } from "../context/UiContext";




const RouterPage = () => {


  const { ocultarMenu } = useContext( UiContext )
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider 
            collapsedWidth={0}
            breakpoint="md"
            hidden={ ocultarMenu }
        >
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              
                {
                key: "1",
                icon: <UserOutlined />,
                label: (
                  <Link to="/ingresar">
                  Ingresar
                  </Link>
                )
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <Link to="/cola">
                    Cola
                  </Link>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: (
                  <Link to="/crear-ticket">
                    Crear Ticket
                  </Link>
                ),
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          ></Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/ingresar" element={ <Ingresar/> } />
              <Route path="/cola" element={<Cola/>} />
              <Route path="/crear-ticket" element={<CrearTicket/>} />
              <Route path="/Escritorio" element={<Escritorio/>} />
              <Route path='/*' element={ <Ingresar/> }></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default RouterPage;
