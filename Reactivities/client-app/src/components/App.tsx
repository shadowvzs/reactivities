import React, { useState, useEffect } from "react";
import { Header, Icon, List } from 'semantic-ui-react'
import axios from "axios";

interface Value {
    id: number;
    name: string;
}

const App: React.FC = () => {
    const [values, setValues] = useState<Value[]>([]);

    useEffect(() => {
        axios.get<Value[]>('http://172.18.0.2:4999/api/values').then((response) => {
            setValues(response.data);
        })
        // setValues([{ id: 1, name: '22'}])
    }, []);

    return (
        <div>
            <Header as='h2'>
                <Icon name='plug' />
                <Header.Content> Reactivities </Header.Content>
            </Header>
            <List>
                { values.map(x => (<List.Item key={x.id}>{x.name}</List.Item>)) }
            </List>            
        </div>
    );
}

export default App;
