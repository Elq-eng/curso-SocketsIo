import React, { useContext, useEffect, useState } from 'react';

import { Col, Row, Typography, List, Card, Tag, Divider } from 'antd';
import  useHideMenu  from '../hooks/useHideMenu';
import { SocketContext } from '../context/SocketContext';
import { getUltimos } from '../helpers/getUltimos';



const { Title, Text } = Typography;


const data = [
    {
        ticketNo: 33,
        escritorio: 3,
        agente: 'Fernando Herrera'
    },
    {
        ticketNo: 34,
        escritorio: 4,
        agente: 'Melissa Flores'
    },
    {
        ticketNo: 35,
        escritorio: 5,
        agente: 'Carlos Castro'
    },
    {
        ticketNo: 36,
        escritorio: 3,
        agente: 'Fernando Herrera'
    },
    {
        ticketNo: 37,
        escritorio: 3,
        agente: 'Fernando Herrera'
    },
    {
        ticketNo: 38,
        escritorio: 2,
        agente: 'Melissa Flores'
    },
    {
        ticketNo: 39,
        escritorio: 5,
        agente: 'Carlos Castro'
    },
];

const Cola = () => {

    useHideMenu(true);
    const { socket } = useContext( SocketContext )
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        
        socket.on('ticket-asignado', ( asignados )=>{
            setTickets( asignados)
        })

        return ()=>{
            socket.off('ticket-asignado')
        }
        
    }, [socket]);

    useEffect(() => {
        getUltimos().then( setTickets )
    }, []);

    return (
        <>
            <Title level={ 1 }>Atendiendo al cliente</Title>
            <Row>
                <Col span={ 12 }>
                    <List 
                        dataSource={ tickets.slice(0,3) }
                        renderItem={ item => (
                            <List.Item>
                                <Card
                                    style={{ width: 300, marginTop: 16 }}
                                    actions={[
                                        <Tag color="volcano"> { item.agente } </Tag>,
                                        <Tag color="magenta"> Escritorio: { item.escritorio } </Tag>,
                                    ]}
                                >
                                    <Title> No. { item.number  }</Title>
                                </Card>
                            </List.Item>
                        )}
                    />
                </Col>


                <Col span={ 12 }>

                    <Divider> Historial </Divider>
                    <List 
                        dataSource={ tickets.slice(3) }
                        renderItem={ item => (
                            <List.Item>
                                <List.Item.Meta 
                                    title={ `Ticket No. ${ item.number }` }
                                    description={
                                        <>
                                            <Text type="secondary">En el escritorio: </Text>
                                            <Tag color="magenta"> { item.number } </Tag>
                                            <Text type="secondary"> Agente: </Text>
                                            <Tag color="volcano"> { item.agente } </Tag>
                                        </>
                                    }
                                />
                            </List.Item>
                        )}
                    
                    />

                </Col>
            </Row>

        </>
    )
}


export default Cola