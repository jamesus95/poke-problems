import { Endpoint } from '@rest-hooks/rest';
import React, { useEffect, useState } from 'react';
import { Button, Container, Pagination, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useRestApi } from '../hooks/useRestApi';

const endpoint = new Endpoint(({ limit, offset }) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).then(res => res.json());
});

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [results, setResults] = useState();
    const count = 100;
    const { data, loading, error } = useRestApi(endpoint, { limit: count, offset: (currentPage - 1) * count });
    console.log(data, loading, error);

    useEffect(() => {
        if (data?.count) {
            setTotalPages(data?.count / count);
        }
    }, [data?.count, count]);

    useEffect(() => {
        if (data?.results) {
            setResults(data?.results);
        }
    }, [data?.results])

    if (!results) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>error: {error}</div>
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(<Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
            {i}
        </Pagination.Item>)
    }

    return <Container>
        <Row><h1>Header</h1></Row>
        <Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Regular</th>
                        <th>Shiny</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((pokemon, index) => {
                        const segments = pokemon.url.split('/');
                        const number = segments[segments.length - 2];

                        return <tr key={index}>
                            <td>{pokemon.name}</td>
                            <td><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`} alt={number} /></td>
                            <td><img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${number}.png`} alt={number} /></td>
                            <td><Link to={`/pokemon/${number}`}>View</Link></td>
                        </tr>
                    })}
                </tbody>
            </Table>
        </Row>
        <Row>
            <Pagination>
                {pages}
            </Pagination>
        </Row>
    </Container>
}

export default Home;