import React, { useContext, useState } from 'react'
import { Row,Col, Typography, Button, Divider } from "antd";
import { CloseCircleOutlined,DoubleRightOutlined } from "@ant-design/icons"
import useHideMenu from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Navigate, useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';


const { Title, Text } = Typography

const Escritorio = () => {

  useHideMenu(false)
  const [usuario] = useState(getUsuarioStorage());
  const navigate = useNavigate()
  const { socket } = useContext( SocketContext )
  const [ticket, setTicket] = useState(null);



  const salir = () => {
    localStorage.clear();
    navigate("/ingresar")
  }
  const siguienteTicket = () => {
    socket.emit('siguiente-ticket-trabajar', usuario, ( ticket) => { 
      setTicket( ticket )
    })
  }

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to="/ingresar"></Navigate>
  }


  return (
    <><Row>
      
        <Col span={ 20 }>
          <Title level={ 2 }> {usuario.agente} </Title>
          <Text> Usted esta trabajando en el escritorio </Text>
          <Text type='success'> {usuario.escritorio} </Text>
        
        </Col>

        <Col  span={ 4 } align="right">
          <Button
            shape="round"
            type="danger"
            onClick={ salir }
          >
            <CloseCircleOutlined />
            Salir
          </Button> 
        
        
        </Col>

      </Row>
      
      <Divider></Divider>  

      {
        ticket && 
      (
        <Row>
        <Col>
          <Text> Esta atendiendo el ticket numero: </Text>
          <Text
            style={{fontSize:30}}
            type='danger'
          > 
          { ticket.number}
          </Text>

        </Col>
      </Row>
      )
      }

      <Row>
        <Col offset={18} span={6} align="right">
          <Button 
            onClick={siguienteTicket}
            shape='round'
            type="primary"

          >
            <DoubleRightOutlined />
            Siguiente

          </Button>
        
        </Col>

      </Row>

    </>
  )
}

export default Escritorio