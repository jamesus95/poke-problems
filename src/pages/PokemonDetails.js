import { Endpoint } from '@rest-hooks/rest';
import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useRestApi } from '../hooks/useRestApi';

const endpoint = new Endpoint(({ id }) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json());
});

const PokemonDetails = () => {
    const { id } = useParams();
    const [result, setResult] = useState();
    const { data, error } = useRestApi(endpoint, { id });

    useEffect(() => {
        if (data?.result) {
            setResult(data.result);
        }
    }, [data?.result])

    if (!result) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error: {error}</div>
    }

    return <Container>
        <Row><h1>Header</h1></Row>
        <Row>
            {result.name}
            <img src={result.sprites.front_default} alt={result.name} />
        </Row>
    </Container>
}

export default PokemonDetails;